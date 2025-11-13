import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, DollarSign, Clock, TrendingUp, Plus } from "lucide-react";

const BusinessDashboard = () => {
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
                    Tokenize your invoice for instant financing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Client Name</Label>
                      <Input id="client" placeholder="e.g., TechStart Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Invoice Amount ($)</Label>
                      <Input id="amount" type="number" placeholder="50000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceId">Invoice ID</Label>
                      <Input id="invoiceId" placeholder="INV-2024-003" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Desired Discount (%)</Label>
                    <Input id="discount" type="number" placeholder="5" step="0.1" />
                    <p className="text-sm text-muted-foreground">
                      Lower discount rates increase chances of faster financing
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input id="description" placeholder="Services rendered for..." />
                  </div>

                  <Button className="w-full">
                    Tokenize Invoice
                  </Button>
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
