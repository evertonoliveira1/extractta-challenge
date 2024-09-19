import { Vehicle } from './schemas/vehicles.schema';

export interface VehicleResponse {
  data: Vehicle[];
  total: number;
}
