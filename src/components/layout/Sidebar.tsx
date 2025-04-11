
import { Link, useLocation } from "react-router-dom";
import { 
  Computer, 
  Laptop, 
  Monitor, 
  Mouse, 
  Keyboard, 
  Phone, 
  Smartphone, 
  Printer, 
  ScanSearch, 
  BarChart, 
  Plus,
  Menu,
  X,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const NavItem = ({ 
  icon: Icon, 
  label, 
  to, 
  active 
}: { 
  icon: React.ElementType; 
  label: string; 
  to: string; 
  active: boolean;
}) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          active && "bg-sidebar-accent text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: BarChart, label: t("sidebar.dashboard"), to: "/" },
    { icon: Computer, label: t("sidebar.computers"), to: "/category/computer" },
    { icon: Laptop, label: t("sidebar.laptops"), to: "/category/laptop" },
    { icon: Monitor, label: t("sidebar.monitors"), to: "/category/monitor" },
    { icon: Mouse, label: t("sidebar.mice"), to: "/category/mouse" },
    { icon: Keyboard, label: t("sidebar.keyboards"), to: "/category/keyboard" },
    { icon: Phone, label: t("sidebar.telephones"), to: "/category/telephone" },
    { icon: Smartphone, label: t("sidebar.mobilePhones"), to: "/category/mobile" },
    { icon: ScanSearch, label: t("sidebar.scanners"), to: "/category/scanner" },
    { icon: Printer, label: t("sidebar.printers"), to: "/category/printer" },
  ];

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden text-primary"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-sidebar-foreground">{t("app.title")}</h2>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-sidebar-foreground"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "bg-accent" : ""}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage("es")}
                    className={language === "es" ? "bg-accent" : ""}
                  >
                    Español
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-sidebar-foreground"
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Link to="/assets/new">
              <Button className="w-full gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
                <Plus className="h-5 w-5" />
                <span>{t("sidebar.addNewAsset")}</span>
              </Button>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to))}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
