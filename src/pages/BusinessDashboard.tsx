import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWalletKit } from "@mysten/wallet-kit";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, DollarSign, Clock, TrendingUp, Plus, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { InvoiceFormData, formDataToInvoiceParams, createIssueInvoiceTransaction, hashFile } from "@/lib/invoice";
import { suiClient } from "@/lib/suiClient";

const invoiceFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  invoiceId: z.string().min(1, "Invoice ID is required"),
  dueDate: z.string().min(1, "Due date is required"),
  discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  description: z.string().optional(),
});

const BusinessDashboard = () => {
  const { currentWallet, signAndExecuteTransactionBlock } = useWalletKit();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      clientName: "",
      amount: 0,
      invoiceId: "",
      dueDate: "",
      discount: 5,
      description: "",
    },
  });

  const onSubmit = async (data: InvoiceFormData) => {
    if (!currentWallet) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate document hash from file or description
      let docHash: Uint8Array | undefined;
      if (invoiceFile) {
        docHash = await hashFile(invoiceFile);
        toast.info("Invoice document hashed successfully");
      }

      // Convert form data to invoice parameters
      const params = await formDataToInvoiceParams(data, docHash);

      // Create transaction
      const tx = createIssueInvoiceTransaction(params);

      // Sign and execute transaction
      toast.info("Signing transaction...");
      
      try {
        const result = await signAndExecuteTransactionBlock({
          transactionBlock: tx as any, // Transaction is compatible with TransactionBlock in wallet-kit
          options: {
            showEffects: true,
            showEvents: true,
          },
        });

        toast.success("Invoice created successfully!", {
          description: `Transaction: ${result.digest}`,
        });
        
        // Reset form
        reset();
        setInvoiceFile(null);
        setIsSubmitting(false);
      } catch (error: any) {
        console.error("Error creating invoice:", error);
        toast.error("Failed to create invoice", {
          description: error.message || "An unexpected error occurred",
        });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error("Error preparing invoice:", error);
      toast.error("Failed to prepare invoice", {
        description: error.message || "An unexpected error occurred",
      });
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Business Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your invoices and track financing status
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Total Invoices
                </CardDescription>
                <CardTitle className="text-3xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">8 active, 16 settled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Financed
                </CardDescription>
                <CardTitle className="text-3xl">$450K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Lifetime value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending Amount
                </CardDescription>
                <CardTitle className="text-3xl">$125K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">8 active invoices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Avg. Discount
                </CardDescription>
                <CardTitle className="text-3xl text-primary">4.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Better than average</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">Active Invoices</TabsTrigger>
              <TabsTrigger value="settled">Settled</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Invoice #INV-2024-001</CardTitle>
                      <CardDescription>Client: TechStart Inc.</CardDescription>
                    </div>
                    <Badge>Financed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold">$50,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Received</p>
                      <p className="font-semibold text-accent">$47,500</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="font-semibold">5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-semibold">Feb 15, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View on Blockchain</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Invoice #INV-2024-002</CardTitle>
                      <CardDescription>Client: Global Solutions LLC</CardDescription>
                    </div>
                    <Badge variant="outline">Listed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold">$75,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected</p>
                      <p className="font-semibold text-accent">$71,250</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="font-semibold">5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-semibold">Mar 1, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Listing</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settled" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Invoice #INV-2023-156</CardTitle>
                      <CardDescription>Client: Enterprise Corp</CardDescription>
                    </div>
                    <Badge variant="secondary">Settled</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold">$100,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Received</p>
                      <p className="font-semibold text-accent">$96,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount</p>
                      <p className="font-semibold">4%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Settled</p>
                      <p className="font-semibold">Jan 15, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Transaction</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Invoice</CardTitle>
                  <CardDescription>
                    Tokenize your invoice for instant financing on Sui blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientName">
                          Client Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="clientName"
                          placeholder="e.g., TechStart Inc."
                          {...register("clientName")}
                          disabled={isSubmitting}
                        />
                        {errors.clientName && (
                          <p className="text-sm text-destructive">{errors.clientName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">
                          Invoice Amount ($) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="50000"
                          step="0.01"
                          {...register("amount", { valueAsNumber: true })}
                          disabled={isSubmitting}
                        />
                        {errors.amount && (
                          <p className="text-sm text-destructive">{errors.amount.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="invoiceId">
                          Invoice ID <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="invoiceId"
                          placeholder="INV-2024-003"
                          {...register("invoiceId")}
                          disabled={isSubmitting}
                        />
                        {errors.invoiceId && (
                          <p className="text-sm text-destructive">{errors.invoiceId.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">
                          Due Date <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="dueDate"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          {...register("dueDate")}
                          disabled={isSubmitting}
                        />
                        {errors.dueDate && (
                          <p className="text-sm text-destructive">{errors.dueDate.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discount">
                        Desired Discount (%) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="discount"
                        type="number"
                        placeholder="5"
                        step="0.1"
                        min="0"
                        max="100"
                        {...register("discount", { valueAsNumber: true })}
                        disabled={isSubmitting}
                      />
                      {errors.discount && (
                        <p className="text-sm text-destructive">{errors.discount.message}</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Lower discount rates increase chances of faster financing
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Input
                        id="description"
                        placeholder="Services rendered for..."
                        {...register("description")}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoiceFile">Invoice Document (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="invoiceFile"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setInvoiceFile(file);
                              toast.info(`File selected: ${file.name}`);
                            }
                          }}
                          disabled={isSubmitting}
                          className="cursor-pointer"
                        />
                        {invoiceFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setInvoiceFile(null);
                              const input = document.getElementById("invoiceFile") as HTMLInputElement;
                              if (input) input.value = "";
                            }}
                            disabled={isSubmitting}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upload invoice PDF or image. The document will be hashed and stored on-chain.
                      </p>
                    </div>

                    {!currentWallet && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Please connect your wallet to create an invoice.
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || !currentWallet}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Invoice...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Tokenize Invoice
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 ChainInvoice. Built on Sui Blockchain.</p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessDashboard;
