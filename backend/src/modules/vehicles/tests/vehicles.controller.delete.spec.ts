import { HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { VehicleCreateDto } from '../dto/vehicles-create.dto';
import { Vehicle, VehicleSchema } from '../schemas/vehicles.schema';
import { VehiclesController } from '../vehicles.controller';
import { VehiclesRepository } from '../vehicles.repository';
import { VehiclesService } from '../vehicles.service';
import { validateError } from '../vehicles.utils';

const vehicleDto: VehicleCreateDto = {
  title: 'Ford Ka - Preto - Semi-novo',
  brand: 'Ford',
  vehicleModel: 'Ka',
  year: 2011,
  licensePlate: 'Z095GIO',
  color: 'black',
  renavam: '05741163466',
  price: 42000,
};

describe('VehiclesController - Delete', () => {
  let vehicleController: VehiclesController;
  let mongoServer: MongoMemoryServer;
  let vehicleRepository: VehiclesRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Vehicle.name, schema: VehicleSchema },
        ]),
      ],
      controllers: [VehiclesController],
      providers: [VehiclesService, VehiclesRepository],
    }).compile();

    vehicleController = module.get<VehiclesController>(VehiclesController);
    vehicleRepository = module.get<VehiclesRepository>(VehiclesRepository);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await vehicleRepository.deleteAll();
  });

  const createVehicle = async (dto: VehicleCreateDto = vehicleDto) => {
    return await vehicleController.create(dto);
  };

  const getAllVehicles = async () => {
    const response = await vehicleController.findAll({});
    return response;
  };

  describe('delete', () => {
    it('should delete a vehicle by id', async () => {
      const vehicle = await createVehicle();
      const deletedVehicle = await vehicleController.delete(
        vehicle._id.toString(),
      );

      expect(deletedVehicle._id).toEqual(vehicle._id);

      const { data } = await getAllVehicles();
      expect(data).toHaveLength(0);
    });

    it('should throw an error if vehicle to delete is invalid', async () => {
      const response = await validateError(() =>
        vehicleController.delete('invalidId'),
      );
      await expect(response.message).toEqual('ID inválido.');
      await expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('should throw an error if vehicle to delete is not found', async () => {
      const response = await validateError(() =>
        vehicleController.delete('66eb0d93d43138f8e678081b'),
      );
      await expect(response.message).toEqual('Veículo não encontrado.');
      await expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
    });
  });
});
