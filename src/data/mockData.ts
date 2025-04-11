
import { Asset } from "@/types/inventory";

export const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Dell XPS 15",
    type: "laptop",
    status: "assigned",
    serialNumber: "DLL-XPS-12345",
    purchaseDate: "2023-01-15",
    assignedTo: "John Doe",
    location: "Main Office",
    notes: "High performance developer laptop",
    lastUpdated: "2023-05-20",
  },
  {
    id: "2",
    name: "HP ProDesk",
    type: "computer",
    status: "available",
    serialNumber: "HP-PD-67890",
    purchaseDate: "2022-11-10",
    location: "Storage Room",
    lastUpdated: "2023-03-15",
  },
  {
    id: "3",
    name: "Dell UltraSharp 27\"",
    type: "monitor",
    status: "assigned",
    serialNumber: "DLL-US-54321",
    purchaseDate: "2023-02-20",
    assignedTo: "Jane Smith",
    location: "Marketing Department",
    lastUpdated: "2023-04-10",
  },
  {
    id: "4",
    name: "Logitech MX Master",
    type: "mouse",
    status: "assigned",
    serialNumber: "LGT-MX-11223",
    purchaseDate: "2023-01-05",
    assignedTo: "Mike Johnson",
    location: "Engineering Department",
    lastUpdated: "2023-02-18",
  },
  {
    id: "5",
    name: "Keychron K2",
    type: "keyboard",
    status: "assigned",
    serialNumber: "KCH-K2-98765",
    purchaseDate: "2022-12-12",
    assignedTo: "Jane Smith",
    location: "Marketing Department",
    lastUpdated: "2023-01-30",
  },
  {
    id: "6",
    name: "Cisco IP Phone",
    type: "telephone",
    status: "available",
    serialNumber: "CSC-IP-45678",
    purchaseDate: "2022-10-18",
    location: "Storage Room",
    lastUpdated: "2023-02-05",
  },
  {
    id: "7",
    name: "iPhone 14 Pro",
    type: "mobile",
    status: "assigned",
    serialNumber: "APL-IP14-76543",
    purchaseDate: "2023-03-01",
    assignedTo: "Alex Brown",
    location: "Sales Department",
    notes: "Company phone with unlimited data plan",
    lastUpdated: "2023-03-02",
  },
  {
    id: "8",
    name: "Epson WorkForce Scanner",
    type: "scanner",
    status: "maintenance",
    serialNumber: "EPS-WF-33445",
    purchaseDate: "2022-09-15",
    location: "IT Department",
    notes: "Paper feed mechanism needs repair",
    lastUpdated: "2023-04-25",
  },
  {
    id: "9",
    name: "HP LaserJet Pro",
    type: "printer",
    status: "assigned",
    serialNumber: "HP-LJ-56789",
    purchaseDate: "2022-08-10",
    assignedTo: "Finance Department",
    location: "Finance Department",
    lastUpdated: "2023-01-22",
  },
  {
    id: "10",
    name: "Microsoft Surface Pro",
    type: "laptop",
    status: "retired",
    serialNumber: "MS-SP-88997",
    purchaseDate: "2020-05-12",
    location: "Storage Room",
    notes: "Battery no longer holds charge, replaced with newer model",
    lastUpdated: "2023-02-10",
  },
  {
    id: "11",
    name: "Samsung 32\" Curved Monitor",
    type: "monitor",
    status: "assigned",
    serialNumber: "SAM-CM-22334",
    purchaseDate: "2023-01-20",
    assignedTo: "David Wilson",
    location: "Design Department",
    lastUpdated: "2023-02-15",
  },
  {
    id: "12",
    name: "Logitech Webcam C920",
    type: "other",
    status: "available",
    serialNumber: "LGT-WC-65432",
    purchaseDate: "2022-12-05",
    location: "IT Department",
    lastUpdated: "2023-03-10",
  },
];

export const getAssetTypeCount = () => {
  const counts: Record<string, number> = {
    computer: 0,
    laptop: 0,
    monitor: 0,
    mouse: 0,
    keyboard: 0,
    telephone: 0,
    mobile: 0,
    scanner: 0,
    printer: 0,
    other: 0,
  };

  mockAssets.forEach((asset) => {
    counts[asset.type]++;
  });

  return counts;
};

export const getAssetStatusCount = () => {
  const counts: Record<string, number> = {
    available: 0,
    assigned: 0,
    maintenance: 0,
    retired: 0,
  };

  mockAssets.forEach((asset) => {
    counts[asset.status]++;
  });

  return counts;
};
