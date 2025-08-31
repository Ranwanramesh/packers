import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Truck, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Networks", href: "/networks" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" data-testid="link-home">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-6">
                    {navigation.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link 
                          href={item.href} 
                          data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className={cn(
                            "block px-3 py-3 text-base font-medium border-b border-border transition-colors",
                            isActive(item.href)
                              ? "text-primary"
                              : "text-foreground hover:text-primary"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-2 mr-3">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Swastik Packers & Movers</h3>
                  <p className="text-sm opacity-75">Professional Moving Services</p>
                </div>
              </div>
              <p className="text-sm opacity-75 mb-4 max-w-md">
                Your trusted partner for safe, reliable, and affordable moving solutions. We make relocation stress-free with our professional services and 24/7 customer support.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-background hover:text-primary transition-colors" data-testid="link-social-facebook">
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="#" className="text-background hover:text-primary transition-colors" data-testid="link-social-twitter">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-background hover:text-primary transition-colors" data-testid="link-social-instagram">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" className="text-background hover:text-primary transition-colors" data-testid="link-social-linkedin">
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      data-testid={`link-footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="opacity-75 hover:opacity-100 transition-opacity"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="#inquiry-form" className="opacity-75 hover:opacity-100 transition-opacity" data-testid="link-footer-quote">
                    Get Quote
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center opacity-75">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+919992318883" className="hover:opacity-100 transition-opacity" data-testid="link-footer-phone">
                    +91-9992318883
                  </a>
                </li>
                <li className="flex items-center opacity-75">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:info@swastikpackersandmovers.com" className="hover:opacity-100 transition-opacity" data-testid="link-footer-email">
                    info@swastikpackersandmovers.com
                  </a>
                </li>
                <li className="flex items-start opacity-75">
                  <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                  <span>123 Business Center, Commercial Street, Mumbai - 400001</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm opacity-75">
              &copy; 2025 Swastik Packers and Movers. All rights reserved. | Website: swastikpackersandmovers.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
