import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Wallet, PieChart } from "lucide-react";

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Investor Dashboard</h1>
            <p className="text-muted-foreground">
              Track your portfolio and investment performance
            </p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Total Invested
                </CardDescription>
                <CardTitle className="text-3xl">$280K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Across 12 invoices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Total Returns
                </CardDescription>
                <CardTitle className="text-3xl text-accent">$14.2K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">5.07% average return</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Active Value
                </CardDescription>
                <CardTitle className="text-3xl">$156K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">7 pending settlements</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Success Rate
                </CardDescription>
                <CardTitle className="text-3xl">100%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">All invoices settled</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">Active Investments</TabsTrigger>
              <TabsTrigger value="settled">Settled</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>TechCorp Solutions</CardTitle>
                      <CardDescription>Invoice #INV-001</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="font-semibold">$47,500</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                      <p className="font-semibold text-accent">$50,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Rate</p>
                      <p className="font-semibold">5.26%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-semibold">Feb 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <Badge variant="outline">A</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Global Manufacturing Ltd</CardTitle>
                      <CardDescription>Invoice #INV-002</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="font-semibold">$120,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                      <p className="font-semibold text-accent">$125,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Rate</p>
                      <p className="font-semibold">4.17%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-semibold">Mar 1, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <Badge variant="outline">AA</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settled" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Healthcare Services Co</CardTitle>
                      <CardDescription>Invoice #INV-154</CardDescription>
                    </div>
                    <Badge variant="secondary">Settled</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="font-semibold">$58,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Returned</p>
                      <p className="font-semibold text-accent">$60,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Rate</p>
                      <p className="font-semibold">3.45%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Settled Date</p>
                      <p className="font-semibold">Jan 28, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="secondary">Paid</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Retail Innovations Inc</CardTitle>
                      <CardDescription>Invoice #INV-143</CardDescription>
                    </div>
                    <Badge variant="secondary">Settled</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="font-semibold">$45,600</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Returned</p>
                      <p className="font-semibold text-accent">$48,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Rate</p>
                      <p className="font-semibold">5.26%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Settled Date</p>
                      <p className="font-semibold">Jan 15, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="secondary">Paid</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Distribution</CardTitle>
                    <CardDescription>By industry sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Technology</span>
                          <span className="text-sm font-semibold">35%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Healthcare</span>
                          <span className="text-sm font-semibold">28%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '28%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Manufacturing</span>
                          <span className="text-sm font-semibold">22%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '22%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Retail</span>
                          <span className="text-sm font-semibold">15%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Average Return Rate</span>
                      <span className="font-semibold text-accent">5.07%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Total Investments</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Avg. Investment Size</span>
                      <span className="font-semibold">$23,333</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Settlement Rate</span>
                      <span className="font-semibold text-accent">100%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

export default InvestorDashboard;
