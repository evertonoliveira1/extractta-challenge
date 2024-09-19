import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { VehicleCreateDto } from './dto/vehicles-create.dto';
import { VehicleFilterDto } from './dto/vehicles-filter.dto';
import { VehicleUpdateDto } from './dto/vehicles-update.dto';
import { Vehicle } from './schemas/vehicles.schema';
import { VehicleResponse } from './vehicles.interfaces';

@Injectable()
export class VehiclesRepository {
  constructor(@InjectModel(Vehicle.name) private model: Model<Vehicle>) {}

  async create(VehicleCreateDto: VehicleCreateDto): Promise<Vehicle> {
    try {
      const vehicle = new this.model(VehicleCreateDto);
      return await vehicle.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException(
          'Chave duplicada: já existe um automóvel usando a mesma placa ou RENAVAM.',
        );
      } else {
        throw new InternalServerErrorException(
          'Erro ao registrar o automóvel.',
        );
      }
    }
  }

  async findAll(filter?: VehicleFilterDto): Promise<VehicleResponse> {
    const {
      title,
      brand,
      vehicleModel,
      year,
      minPrice,
      maxPrice,
      licensePlate,
      color,
      renavam,
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
    } = filter || {};

    const query: any = {
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(brand && { brand: { $regex: brand, $options: 'i' } }),
      ...(vehicleModel && {
        vehicleModel: { $regex: vehicleModel, $options: 'i' },
      }),
      ...(year && { year }),
      ...(minPrice !== undefined &&
        maxPrice !== undefined && {
          price: { $gte: minPrice, $lte: maxPrice },
        }),
      ...(licensePlate && {
        licensePlate: { $regex: licensePlate, $options: 'i' },
      }),
      ...(color && { color: { $regex: color, $options: 'i' } }),
      ...(renavam && { renavam: { $regex: renavam, $options: 'i' } }),
    };

    const [total, data] = await Promise.all([
      this.model.countDocuments(query),
      this.model
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .select({ __v: 0 })
        .sort(orderBy)
        .exec(),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Vehicle> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const vehicle = await this.model.findById(id).exec();

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return vehicle;
  }

  async update(id: string, vehicleDto: VehicleUpdateDto): Promise<Vehicle> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido.');
      }

      const updatedVehicle = await this.model
        .findByIdAndUpdate(id, vehicleDto, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!updatedVehicle) {
        throw new NotFoundException('Veículo não encontrado.');
      }

      return updatedVehicle;
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException(
          'Chave duplicada: já existe um automóvel usando a mesma placa ou RENAVAM.',
        );
      }
      throw err;
    }
  }

  async delete(id: string): Promise<Vehicle> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido.');
    }

    const result = await this.model.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Veículo não encontrado.');
    }

    return result;
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany().exec();
  }
}
