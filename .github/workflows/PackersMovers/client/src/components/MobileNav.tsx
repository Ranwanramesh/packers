import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navigation: Array<{ name: string; href: string }>;
}

export default function MobileNav({ navigation }: MobileNavProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }
    return location.startsWith(href);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        data-testid="button-mobile-menu-toggle"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
          data-testid="overlay-mobile-menu"
        />
      )}

      {/* Mobile navigation menu */}
      <div
        className={cn(
          "fixed top-16 sm:top-20 right-0 h-full w-64 bg-card shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        data-testid="menu-mobile-nav"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <a
                className={cn(
                  "block px-3 py-3 text-base font-medium border-b border-border transition-colors",
                  isActive(item.href)
                    ? "text-primary bg-accent"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                )}
                onClick={closeMenu}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
