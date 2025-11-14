import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coins, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ConnectButton } from "@mysten/wallet-kit";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <ConnectButton />
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
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="flex-shrink-0"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="flex-1">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
