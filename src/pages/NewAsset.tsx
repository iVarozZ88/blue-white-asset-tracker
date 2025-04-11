
import { Link } from "react-router-dom";
import { AssetForm } from "@/components/AssetForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NewAsset = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Asset</h1>
      </div>
      
      <AssetForm mode="create" />
    </div>
  );
};

export default NewAsset;
