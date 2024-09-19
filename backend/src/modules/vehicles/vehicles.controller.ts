import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/local-auth.guard';
import { VehicleCreateDto } from './dto/vehicles-create.dto';
import { VehicleFilterDto } from './dto/vehicles-filter.dto';
import { VehicleUpdateDto } from './dto/vehicles-update.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Post()
  create(@Body() vehicleCreateDto: VehicleCreateDto) {
    return this.service.create(vehicleCreateDto);
  }

  @Get()
  findAll(@Query() filter: VehicleFilterDto) {
    return this.service.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: VehicleUpdateDto) {
    return this.service.update(id, updateVehicleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
