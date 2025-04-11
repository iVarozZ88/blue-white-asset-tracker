
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className={cn(
        "flex-1 p-4 md:p-6 ml-0 md:ml-64 transition-all duration-200",
      )}>
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
      
      <Toaster />
    </div>
  );
}
