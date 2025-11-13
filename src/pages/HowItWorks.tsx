import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Coins, CheckCircle, ArrowRight, Shield, Zap, Globe } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding blockchain-powered invoice financing
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-12 mb-20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <Card className="flex-1">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Invoice Tokenization</CardTitle>
                  <CardDescription>Convert your invoice into a digital asset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    When a business issues an invoice, it's tokenized as an NFT on the Sui blockchain. 
                    This token represents the right to receive payment and contains all invoice metadata:
                  </p>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Invoice amount, due date, and payment terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Debtor information and credit rating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Immutable proof of invoice creation and ownership</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <Card className="flex-1">
                <CardHeader>
                  <Coins className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Marketplace & Financing</CardTitle>
                  <CardDescription>Connect with global investors instantly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    The invoice token is listed on the marketplace where investors can purchase it at a discount:
                  </p>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Business receives immediate cash (e.g., 95% of invoice value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Investor purchases the right to collect full payment (100%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>Transaction recorded transparently on-chain</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <Card className="flex-1">
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Automatic Settlement</CardTitle>
                  <CardDescription>Smart contracts handle the rest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    When the debtor pays the invoice, the smart contract automatically distributes funds:
                  </p>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                      <span>Payment is detected and verified on-chain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                      <span>Full amount goes to current invoice token holder (investor)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                      <span>Invoice NFT is marked as settled and burned</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Fraud Prevention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Immutable blockchain records prevent double financing and fake invoices. 
                    Every transaction is transparent and verifiable.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Speed & Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts automate verification and settlement, reducing processing time 
                    from days to minutes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Global Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with investors worldwide without banking intermediaries or 
                    cross-border payment friction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technical Section */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Why Sui Blockchain?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Object-Based Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Sui's object model is perfect for representing invoices as digital assets with 
                  metadata, ownership, and transaction history.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">High Performance</h3>
                <p className="text-sm text-muted-foreground">
                  High throughput and low latency enable instant transactions suitable for 
                  large-scale financial operations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  Move programming language provides formal verification and safety guarantees, 
                  reducing smart contract vulnerabilities.
                </p>
              </div>
            </CardContent>
          </Card>
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

export default HowItWorks;
