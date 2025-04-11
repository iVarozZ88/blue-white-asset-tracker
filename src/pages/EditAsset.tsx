
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockAssets } from "@/data/mockData";
import { AssetForm } from "@/components/AssetForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EditAsset = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const asset = mockAssets.find((a) => a.id === id);
  
  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Asset Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The asset you're trying to edit doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to={`/assets/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit {asset.name}</h1>
      </div>
      
      <AssetForm mode="edit" initialValues={asset} />
    </div>
  );
};

export default EditAsset;
