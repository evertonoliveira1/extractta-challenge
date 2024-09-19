export interface Vehicle {
  _id?: string;
  title: string;
  brand: string;
  vehicleModel: string;
  year: number;
  price: number;
  licensePlate: string;
  color: string;
  renavam: string;
}

export interface VehicleFilter {
  title?: string;
  brand?: string;
  vehicleModel?: string;
  year?: string;
  minPrice?: number;
  maxPrice?: number;
  licensePlate?: string;
  color?: string;
  renavam?: string;
}

export interface VehicleResponse {
  data: Vehicle[];
  total: number;
}

export interface VehicleResponse {
  vehicles: Vehicle[];
  totalPages: number;
}

export interface SelectOptions {
  label: string,
  value: string,
}

export interface UserProfile {
  username: string;
  email: string;
  createdAt?: Date;
}
