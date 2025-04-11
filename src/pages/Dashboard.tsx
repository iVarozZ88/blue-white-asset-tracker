
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAssetTypeCount, getAssetStatusCount, mockAssets } from "@/data/mockData";
import { AssetType, AssetStatus } from "@/types/inventory";
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
  Check, 
  User, 
  AlertTriangle, 
  Archive 
} from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
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

const statusIcons: Record<AssetStatus, React.ReactNode> = {
  available: <Check className="h-5 w-5" />,
  assigned: <User className="h-5 w-5" />,
  maintenance: <AlertTriangle className="h-5 w-5" />,
  retired: <Archive className="h-5 w-5" />,
};

const statusColors: Record<AssetStatus, string> = {
  available: "#10b981",
  assigned: "#3b82f6",
  maintenance: "#f59e0b",
  retired: "#6b7280",
};

const Dashboard = () => {
  const { t } = useLanguage();
  const typeCounts = getAssetTypeCount();
  const statusCounts = getAssetStatusCount();
  
  const typeData = Object.entries(typeCounts)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0);
  
  const statusData = Object.entries(statusCounts)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0);
  
  const recentAssets = [...mockAssets]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.overview')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalAssets')}</CardTitle>
            <Computer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssets.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.acrossAllCategories')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.available')}</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.available}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.readyForAssignment')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.assigned')}</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.assigned}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.currentlyInUse')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.inMaintenance')}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.maintenance}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.beingRepairedOrServiced')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('dashboard.assetDistribution')}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 15}, 70%, ${50 + index * 5}%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('dashboard.assetStatus')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={statusColors[entry.name as AssetStatus] || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentlyUpdated')}</CardTitle>
          <CardDescription>
            {t('dashboard.lastUpdatedItems')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
              <div>{t('dashboard.tableHeaders.name')}</div>
              <div>{t('dashboard.tableHeaders.type')}</div>
              <div>{t('dashboard.tableHeaders.status')}</div>
              <div>{t('dashboard.tableHeaders.assignedTo')}</div>
              <div>{t('dashboard.tableHeaders.lastUpdated')}</div>
            </div>
            <div className="divide-y">
              {recentAssets.map((asset) => (
                <Link
                  key={asset.id}
                  to={`/assets/${asset.id}`}
                  className="grid grid-cols-5 p-4 text-sm hover:bg-muted/50 transition-colors"
                >
                  <div className="font-medium">{asset.name}</div>
                  <div className="flex items-center gap-2">
                    {typeIcons[asset.type]}
                    <span className="capitalize">{asset.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: statusColors[asset.status] }}
                    />
                    <span className="capitalize">{t(`category.${asset.status}`)}</span>
                  </div>
                  <div>{asset.assignedTo || "—"}</div>
                  <div>
                    {new Date(asset.lastUpdated).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
