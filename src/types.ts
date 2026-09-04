export type Role = 'farmer' | 'owner';
export type Language = 'en' | 'mr' | 'hi';

export interface Equipment {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  type: string;
  category: string;
  hp: string;
  rateHr: number;
  rateAcre: number;
  village: string;
  distance: number;
  image: string;
  ownerId: string;
  ownerName: string;
  ownerRating: number;
  verified: boolean;
  features: string[];
  status: 'available' | 'in_field' | 'maintenance';
  lat: number;
  lng: number;
}

export interface BookingRequest {
  id: string;
  equipmentId: string;
  farmerName: string;
  farmerVillage: string;
  operation: string;
  acres: number;
  estimatedRevenue: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  driverIncluded: boolean;
  dieselIncluded: boolean;
  date: string;
}

export interface Dictionary {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
}
