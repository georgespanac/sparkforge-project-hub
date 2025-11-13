import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coins, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Coins className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              ChainInvoice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link to="/dashboard/business" className="text-sm font-medium hover:text-primary transition-colors">
              For Businesses
            </Link>
            <Link to="/dashboard/investor" className="text-sm font-medium hover:text-primary transition-colors">
              For Investors
            </Link>
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              to="/how-it-works"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/marketplace"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/dashboard/business"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Businesses
            </Link>
            <Link
              to="/dashboard/investor"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Investors
            </Link>
            <Button variant="outline" size="sm" className="w-full">
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
