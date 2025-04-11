
export type AssetType = 
  | "computer"
  | "laptop"
  | "monitor"
  | "mouse"
  | "keyboard"
  | "telephone"
  | "mobile"
  | "scanner"
  | "printer"
  | "other";

export type AssetStatus = 
  | "available"
  | "assigned"
  | "maintenance"
  | "retired";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  serialNumber: string;
  purchaseDate: string;
  assignedTo?: string;
  location?: string;
  notes?: string;
  lastUpdated: string;
}
