import { HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { VehicleCreateDto } from '../dto/vehicles-create.dto';
import { VehicleUpdateDto } from '../dto/vehicles-update.dto';
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

const validateDto = async (
  type: 'create' | 'update',
  key: string,
  value: any,
  initialVehicle: any = vehicleDto,
) => {
  const dtoInstance =
    type === 'create'
      ? new VehicleCreateDto(initialVehicle)
      : new VehicleUpdateDto(initialVehicle);

  (dtoInstance as VehicleCreateDto | VehicleUpdateDto)[key] = value;

  const [errors] = await validate(dtoInstance);
  return errors.constraints;
};

describe('VehiclesController -> Create', () => {
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

  describe('create', () => {
    describe('Insert operations', () => {
      it('should insert a new vehicle with valid data', async () => {
        const response = await createVehicle();
        expect(response.title).toEqual(vehicleDto.title);
        expect(response.brand).toEqual(vehicleDto.brand);
      });

      it('should throw an error when try to duplicate de licensePlate', async () => {
        await createVehicle();
        const response = await validateError(() => createVehicle());
        await expect(response.message).toEqual(
          'Chave duplicada: já existe um automóvel usando a mesma placa ou RENAVAM.',
        );
        await expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
      });

      it('should throw an error if title is missing', async () => {
        const incompleteDto = { ...vehicleDto, title: '' };
        const response = await validateError(() =>
          createVehicle(incompleteDto),
        );
        await expect(response.message).toEqual(
          'Erro ao registrar o automóvel.',
        );
        await expect(response.statusCode).toEqual(
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    });

    describe('Create Dto Validation Tests', () => {
      it('should fail validation when title is empty', async () => {
        const constraints = await validateDto('create', 'title', '');
        expect(constraints).toEqual({
          isNotEmpty: 'O campo título não pode estar vazio',
        });
      });

      it('should fail validation when title is not a string', async () => {
        const title = 123;
        const constraints = await validateDto('create', 'title', title);
        expect(constraints).toEqual({
          isString: 'O campo título não pode estar vazio e deve ser uma string',
        });
      });

      it('should fail validation when year is not an integer', async () => {
        const year = 2024.5;
        const constraints = await validateDto('create', 'year', year);
        expect(constraints).toEqual({
          max: 'O ano deve ser menor ou igual ao ano atual (2024).',
          isInt: 'O ano deve ser um número inteiro',
        });
      });

      it('should fail validation when year is below 1886', async () => {
        const year = 1800;
        const constraints = await validateDto('create', 'year', year);
        expect(constraints).toEqual({
          min: 'O ano deve ser maior ou igual a 1886',
        });
      });

      it('should fail validation when year is above the current year', async () => {
        const year = new Date().getFullYear() + 1;
        const constraints = await validateDto('create', 'year', year);
        expect(constraints).toEqual({
          max: 'O ano deve ser menor ou igual ao ano atual (2024).',
        });
      });

      it('should fail validation when price is not a number', async () => {
        const price = '20000';
        const constraints = await validateDto('create', 'price', price);
        expect(constraints).toEqual({
          isNumber: 'O preço deve ser um número',
          min: 'O preço deve ser maior que 0',
        });
      });

      it('should fail validation when price is less than 0.1', async () => {
        const price = 0;
        const constraints = await validateDto('create', 'price', price);
        expect(constraints).toEqual({
          min: 'O preço deve ser maior que 0',
        });
      });

      it('should fail validation when licensePlate is empty', async () => {
        const constraints = await validateDto('create', 'licensePlate', '');
        expect(constraints).toEqual({
          isLength: 'A placa do veículo deve ter exatamente 7 caracteres',
          isNotEmpty: 'A placa do veículo não pode estar vazia',
        });
      });

      it('should fail validation when licensePlate is not exactly 7 characters', async () => {
        const constraints = await validateDto(
          'create',
          'licensePlate',
          'ABC12',
        );
        expect(constraints).toEqual({
          isLength: 'A placa do veículo deve ter exatamente 7 caracteres',
        });
      });

      it('should fail validation when renavam is not exactly 11 characters', async () => {
        const constraints = await validateDto(
          'create',
          'renavam',
          '1234567890',
        );
        expect(constraints).toEqual({
          isLength: 'O RENAVAM deve ter exatamente 11 caracteres',
        });
      });
    });
  });
});
