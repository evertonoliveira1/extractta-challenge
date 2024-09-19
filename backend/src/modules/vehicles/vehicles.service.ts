import { Injectable } from '@nestjs/common';

import { VehicleCreateDto } from './dto/vehicles-create.dto';
import { VehicleFilterDto } from './dto/vehicles-filter.dto';
import { VehicleUpdateDto } from './dto/vehicles-update.dto';
import { Vehicle } from './schemas/vehicles.schema';
import { VehicleResponse } from './vehicles.interfaces';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly repository: VehiclesRepository) {}

  create(VehicleCreateDto: VehicleCreateDto) {
    return this.repository.create(VehicleCreateDto);
  }

  findAll(filter: VehicleFilterDto): Promise<VehicleResponse> {
    return this.repository.findAll(filter);
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  update(id: string, vehicleDto: VehicleUpdateDto): Promise<Vehicle> {
    return this.repository.update(id, vehicleDto);
  }
}
