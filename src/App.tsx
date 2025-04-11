
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import CategoryView from "@/pages/CategoryView";
import AssetDetails from "@/pages/AssetDetails";
import NewAsset from "@/pages/NewAsset";
import EditAsset from "@/pages/EditAsset";
import NotFound from "@/pages/NotFound";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/category/:type" element={<CategoryView />} />
              <Route path="/assets/new" element={<NewAsset />} />
              <Route path="/assets/:id" element={<AssetDetails />} />
              <Route path="/assets/:id/edit" element={<EditAsset />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
