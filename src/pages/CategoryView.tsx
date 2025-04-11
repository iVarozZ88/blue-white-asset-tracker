
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockAssets } from "@/data/mockData";
import { AssetType, AssetStatus, Asset } from "@/types/inventory";
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
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
  Search,
  Plus,
} from "lucide-react";
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

const getTypeName = (type: string): string => {
  const typeNames: Record<string, string> = {
    computer: "Computers",
    laptop: "Laptops",
    monitor: "Monitors",
    mouse: "Mice",
    keyboard: "Keyboards",
    telephone: "Telephones",
    mobile: "Mobile Phones",
    scanner: "Scanners",
    printer: "Printers",
  };
  return typeNames[type] || "Unknown Type";
};

const CategoryView = () => {
  const { type } = useParams<{ type: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { t, formatMessage } = useLanguage();

  if (!type) {
    return <div>Invalid category type</div>;
  }

  const typeName = t(`sidebar.${type === 'mobile' ? 'mobilePhones' : type === 'mouse' ? 'mice' : type + 's'}`);
  const typeIcon = typeIcons[type as AssetType] || typeIcons.other;
  
  const filteredAssets = mockAssets.filter((asset) => {
    // Filter by type
    if (asset.type !== type) return false;
    
    // Filter by search query
    if (
      searchQuery &&
      !asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && asset.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const getSingularName = (type: string): string => {
    if (type === 'mouse') return t('sidebar.mice').slice(0, -4); // Remove 'mice' and add 'mouse'
    if (type === 'mobile') return t('sidebar.mobilePhones').slice(0, -1); // Remove 's'
    return typeName.slice(0, -1); // Remove 's' for regular plurals
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-inventory-100 p-2 rounded-full">
            {typeIcon}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{typeName}</h1>
        </div>
        <Link to="/assets/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>{formatMessage("category.addNew", { item: getSingularName(type) })}</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("category.filters")}</CardTitle>
          <CardDescription>
            {formatMessage("category.filterDescription", { category: typeName.toLowerCase() })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={formatMessage("category.searchPlaceholder", { category: typeName.toLowerCase() })}
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("category.filterByStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("category.allStatuses")}</SelectItem>
                  <SelectItem value="available">{t("category.available")}</SelectItem>
                  <SelectItem value="assigned">{t("category.assigned")}</SelectItem>
                  <SelectItem value="maintenance">{t("category.maintenance")}</SelectItem>
                  <SelectItem value="retired">{t("category.retired")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <Link key={asset.id} to={`/assets/${asset.id}`}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">{asset.name}</CardTitle>
                    <CardDescription>{asset.serialNumber}</CardDescription>
                  </div>
                  <div className="bg-inventory-100 p-2 rounded-full">
                    {typeIcons[asset.type]}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("assetDetails.status")}:</span>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: statusColors[asset.status] }}
                        />
                        <span className="text-sm capitalize">{t(`category.${asset.status}`)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t("assetDetails.purchaseDate")}:</span>
                      <span className="text-sm">
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    {asset.assignedTo && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("assetDetails.assignedTo")}:</span>
                        <span className="text-sm">{asset.assignedTo}</span>
                      </div>
                    )}
                    {asset.location && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("assetDetails.location")}:</span>
                        <span className="text-sm">{asset.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground text-lg">
              {formatMessage("category.noItemsFound", { category: typeName.toLowerCase() })}
            </div>
            <p className="text-muted-foreground">
              {formatMessage("category.tryAdjusting", { itemSingular: getSingularName(type).toLowerCase() })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
