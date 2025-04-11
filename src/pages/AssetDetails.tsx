
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockAssets } from "@/data/mockData";
import { AssetType, AssetStatus } from "@/types/inventory";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from "@/components/ui";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Computer,
  Laptop,
  Monitor,
  Mouse,
  Keyboard,
  Phone,
  Smartphone,
  ScanSearch,
  Printer,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const typeIcons: Record<AssetType, React.ReactNode> = {
  computer: <Computer className="h-5 w-5" />,
  laptop: <Laptop className="h-5 w-5" />,
  monitor: <Monitor className="h-5 w-5" />,
  mouse: <Mouse className="h-5 w-5" />,
  keyboard: <Keyboard className="h-5 w-5" />,
  telephone: <Phone className="h-5 w-5" />,
  mobile: <Smartphone className="h-5 w-5" />,
  scanner: <ScanSearch className="h-5 w-5" />,
  printer: <Printer className="h-5 w-5" />,
  other: <Computer className="h-5 w-5" />,
};

const statusColors: Record<AssetStatus, string> = {
  available: "#10b981",
  assigned: "#3b82f6",
  maintenance: "#f59e0b",
  retired: "#6b7280",
};

const AssetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const { t, formatMessage } = useLanguage();

  const asset = mockAssets.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">{t("assetDetails.notFound")}</h1>
        <p className="text-muted-foreground mb-6">
          {t("assetDetails.notFoundDesc")}
        </p>
        <Button asChild>
          <Link to="/">{t("assetDetails.returnToDashboard")}</Link>
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    setDeleting(true);
    // In a real app, we would make an API call here
    setTimeout(() => {
      setDeleting(false);
      toast({
        title: "Asset deleted",
        description: `${asset.name} has been removed from inventory.`,
      });
      navigate("/");
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to={`/category/${asset.type}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("assetDetails.assetInfo")}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link to={`/assets/${asset.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t("assetDetails.areYouSure")}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {formatMessage("assetDetails.deleteConfirmation", { name: asset.name })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t("assetDetails.cancel")}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={deleting}
                      >
                        {deleting ? t("assetDetails.deleting") : t("assetDetails.deleteAsset")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardDescription>{t("assetDetails.details")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.type")}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {typeIcons[asset.type]}
                    <span className="capitalize">{asset.type}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.status")}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: statusColors[asset.status] }}
                    />
                    <span className="capitalize">{asset.status}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.serialNumber")}</h3>
                <p className="mt-1">{asset.serialNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.purchaseDate")}</h3>
                <p className="mt-1">{new Date(asset.purchaseDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.lastUpdated")}</h3>
                <p className="mt-1">{new Date(asset.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("assetDetails.assignmentDetails")}</CardTitle>
            <CardDescription>{t("assetDetails.assignmentInfo")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.assignedTo")}</h3>
                <p className="mt-1">{asset.assignedTo || t("assetDetails.notAssigned")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.location")}</h3>
                <p className="mt-1">{asset.location || t("assetDetails.noLocation")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("assetDetails.notes")}</h3>
                <p className="mt-1 whitespace-pre-wrap">
                  {asset.notes || t("assetDetails.noNotes")}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" asChild>
              <Link to={`/assets/${asset.id}/edit`}>{t("assetDetails.editDetails")}</Link>
            </Button>
            {asset.status === "available" ? (
              <Button>{t("assetDetails.assignAsset")}</Button>
            ) : asset.status === "assigned" ? (
              <Button variant="secondary">{t("assetDetails.unassignAsset")}</Button>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AssetDetails;
