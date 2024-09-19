import { HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { VehicleCreateDto } from '../dto/vehicles-create.dto';
import { Vehicle, VehicleSchema } from '../schemas/vehicles.schema';
import { VehiclesController } from '../vehicles.controller';
import { VehiclesRepository } from '../vehicles.repository';
import { VehiclesService } from '../vehicles.service';
import { createManyRandomVehicles, validateError } from '../vehicles.utils';

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

describe('VehiclesController -> Search', () => {
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

  describe('search', () => {
    describe('findAll', () => {
      it('should return an empty array if no vehicles exist', async () => {
        const { data, total } = await getAllVehicles();
        expect(data).toHaveLength(0);
        expect(total).toEqual(0);
      });

      it('should return an array of vehicles when vehicles exist', async () => {
        await createVehicle();
        const { data, total } = await getAllVehicles();
        expect(data).toHaveLength(1);
        expect(total).toEqual(1);
        expect(data[0].title).toEqual(vehicleDto.title);
      });

      it('should handle cases where the page exceeds available data', async () => {
        await vehicleRepository.deleteAll();
        const vehicles = createManyRandomVehicles(3);
        await Promise.all(vehicles.map(createVehicle));

        const limit = 2;
        const orderBy = 'title';

        const page3 = await vehicleController.findAll({
          orderBy,
          limit,
          page: 3,
        });

        expect(page3.data).toHaveLength(0);
      });

      it('should return the correct number of items per page', async () => {
        const vehicles = createManyRandomVehicles(6);
        await Promise.all(vehicles.map(createVehicle));

        const limit = 3;
        const orderBy = 'title';

        const page1 = await vehicleController.findAll({
          orderBy,
          limit,
          page: 1,
        });
        const page2 = await vehicleController.findAll({
          orderBy,
          limit,
          page: 2,
        });

        expect(page1.data).toHaveLength(3);
        expect(page1.data[0].title).toEqual('Vehiclero 1');
        expect(page1.data[1].title).toEqual('Vehiclero 2');
        expect(page1.data[2].title).toEqual('Vehiclero 3');

        expect(page2.data).toHaveLength(3);
        expect(page2.data[0].title).toEqual('Vehiclero 4');
        expect(page2.data[1].title).toEqual('Vehiclero 5');
        expect(page2.data[2].title).toEqual('Vehiclero 6');
      });

      it('should return paginated results filtered by title', async () => {
        const vehicles = createManyRandomVehicles(5);
        vehicles[4].title = 'Vehiclero de Teste';

        await Promise.all(vehicles.map(createVehicle));

        const limit = 2;
        const orderBy = 'title';
        const title = 'Teste';

        const { data, total } = await vehicleController.findAll({
          title,
          orderBy,
          limit,
          page: 1,
        });

        expect(total).toEqual(1);
        expect(data).toHaveLength(1);
        expect(data[0].title).toEqual(vehicles[4].title);
      });

      it('should return paginated results filtered by licensePlate', async () => {
        const vehicles = createManyRandomVehicles(5);
        vehicles[4].licensePlate = 'LK7W4GS';

        await Promise.all(vehicles.map(createVehicle));

        const limit = 2;
        const orderBy = 'title';
        const licensePlate = 'LK7W4GS';

        const { data, total } = await vehicleController.findAll({
          licensePlate,
          orderBy,
          limit,
          page: 1,
        });

        expect(total).toEqual(1);
        expect(data).toHaveLength(1);
        expect(data[0].licensePlate).toEqual(vehicles[4].licensePlate);
      });
    });

    describe('findOne', () => {
      it('should return a vehicle by id', async () => {
        const vehicle = await createVehicle();
        const foundVehicle = await vehicleController.findOne(
          vehicle._id.toString(),
        );
        expect(foundVehicle.title).toEqual(vehicleDto.title);
      });

      it('should throw an error if vehicle not found', async () => {
        const response = await validateError(() =>
          vehicleController.findOne('invalidId'),
        );
        await expect(response.message).toEqual('ID inválido.');
        await expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      });

      it('should throw an error if vehicle to update is not found', async () => {
        const response = await validateError(() =>
          vehicleController.findOne('66ea09c94e7180ddb25f880c'),
        );
        await expect(response.message).toEqual('Veículo não encontrado.');
        await expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
      });
    });
  });
});
