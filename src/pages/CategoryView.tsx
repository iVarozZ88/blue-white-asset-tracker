
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
  Scanner,
  Printer,
  Search,
  Plus,
} from "lucide-react";

const typeIcons: Record<AssetType, React.ReactNode> = {
  computer: <Computer className="h-5 w-5" />,
  laptop: <Laptop className="h-5 w-5" />,
  monitor: <Monitor className="h-5 w-5" />,
  mouse: <Mouse className="h-5 w-5" />,
  keyboard: <Keyboard className="h-5 w-5" />,
  telephone: <Phone className="h-5 w-5" />,
  mobile: <Smartphone className="h-5 w-5" />,
  scanner: <Scanner className="h-5 w-5" />,
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

  if (!type) {
    return <div>Invalid category type</div>;
  }

  const typeName = getTypeName(type);
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
            <span>Add New {type === "mouse" ? "Mouse" : typeName.slice(0, -1)}</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search your {typeName.toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={`Search ${typeName.toLowerCase()}...`} 
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
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
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
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: statusColors[asset.status] }}
                        />
                        <span className="text-sm capitalize">{asset.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Purchase Date:</span>
                      <span className="text-sm">
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    {asset.assignedTo && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Assigned To:</span>
                        <span className="text-sm">{asset.assignedTo}</span>
                      </div>
                    )}
                    {asset.location && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Location:</span>
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
            <div className="text-muted-foreground text-lg">No {typeName.toLowerCase()} found</div>
            <p className="text-muted-foreground">Try adjusting your filters or add a new {type === "mouse" ? "mouse" : typeName.slice(0, -1).toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
