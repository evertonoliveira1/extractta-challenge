import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Vehicle, VehicleSchema } from './schemas/vehicles.schema';
import { VehiclesController } from './vehicles.controller';
import { VehiclesRepository } from './vehicles.repository';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclesRepository],
  exports: [VehiclesService, VehiclesRepository, MongooseModule],
})
export class VehiclesModule {}
