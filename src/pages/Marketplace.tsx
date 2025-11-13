import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Clock, DollarSign, Building, Search } from "lucide-react";

const mockInvoices = [
  {
    id: "INV-001",
    business: "TechCorp Solutions",
    amount: 50000,
    discount: 5,
    dueDate: "2024-02-15",
    rating: "A",
    industry: "Technology",
  },
  {
    id: "INV-002",
    business: "Global Manufacturing Ltd",
    amount: 125000,
    discount: 4,
    dueDate: "2024-03-01",
    rating: "AA",
    industry: "Manufacturing",
  },
  {
    id: "INV-003",
    business: "Retail Innovations Inc",
    amount: 75000,
    discount: 6,
    dueDate: "2024-02-20",
    rating: "A",
    industry: "Retail",
  },
  {
    id: "INV-004",
    business: "Healthcare Services Co",
    amount: 200000,
    discount: 3.5,
    dueDate: "2024-03-15",
    rating: "AAA",
    industry: "Healthcare",
  },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Invoice Marketplace</h1>
            <p className="text-muted-foreground">
              Discover and invest in verified invoice tokens from businesses worldwide
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search invoices..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="mfg">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Credit Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="aaa">AAA</SelectItem>
                    <SelectItem value="aa">AA</SelectItem>
                    <SelectItem value="a">A</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Highest Discount</SelectItem>
                    <SelectItem value="amount">Highest Amount</SelectItem>
                    <SelectItem value="date">Due Date</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Available</CardDescription>
                <CardTitle className="text-2xl">$2.4M</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Invoices</CardDescription>
                <CardTitle className="text-2xl">142</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Discount</CardDescription>
                <CardTitle className="text-2xl">4.8%</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Return</CardDescription>
                <CardTitle className="text-2xl text-accent">12.5%</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Invoice Listings */}
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">{invoice.business}</h3>
                            <Badge variant={
                              invoice.rating === 'AAA' ? 'default' : 
                              invoice.rating === 'AA' ? 'secondary' : 
                              'outline'
                            }>
                              {invoice.rating} Rated
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Invoice ID: {invoice.id} • {invoice.industry}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <DollarSign className="h-3 w-3" />
                            Invoice Amount
                          </div>
                          <div className="font-semibold">
                            ${invoice.amount.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <TrendingUp className="h-3 w-3" />
                            Discount Rate
                          </div>
                          <div className="font-semibold text-accent">
                            {invoice.discount}%
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <DollarSign className="h-3 w-3" />
                            Your Investment
                          </div>
                          <div className="font-semibold">
                            ${(invoice.amount * (1 - invoice.discount / 100)).toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <Clock className="h-3 w-3" />
                            Due Date
                          </div>
                          <div className="font-semibold">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="whitespace-nowrap">
                        Purchase Invoice
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

export default Marketplace;
