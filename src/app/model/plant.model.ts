export interface PlantRes {
  next: string | null;
  results: Plant[];
}

export interface Plant {
  address: string;
  country: string;
  division: string;
  id: number;
  name: string;
}

export interface PlantDetail {
  address: string;
  city: string;
  country: string;
  description: string;
  division: string;
  id: number;
  manager: string;
  name: string;
  phone: string;
}
