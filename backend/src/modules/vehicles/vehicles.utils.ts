import { v4 as uuidv4 } from 'uuid';

import { VehicleCreateDto } from './dto/vehicles-create.dto';

const generateRandomNumber = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

const generateRandomLicensePlate = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let plate = '';
  for (let i = 0; i < 3; i++) {
    plate += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  plate += '-';
  for (let i = 0; i < 4; i++) {
    plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return plate;
};

const generateRandomRenavam = (): string => {
  return generateRandomNumber(11);
};

const createRandomVehicle = (index: number): VehicleCreateDto => {
  const uniquePlates = new Set<string>();
  const uniqueRenavams = new Set<string>();

  const generateUniqueLicensePlate = (): string => {
    let plate;
    do {
      plate = generateRandomLicensePlate();
    } while (uniquePlates.has(plate));
    uniquePlates.add(plate);
    return plate;
  };

  const generateUniqueRenavam = (): string => {
    let renavam;
    do {
      renavam = generateRandomRenavam();
    } while (uniqueRenavams.has(renavam));
    uniqueRenavams.add(renavam);
    return renavam;
  };

  const randomVehicleDto: VehicleCreateDto = {
    title: `Vehiclero ${index + 1}`,
    brand: `Marca ${uuidv4().slice(0, 5)}`,
    vehicleModel: `Modelo ${uuidv4().slice(0, 5)}`,
    year:
      Math.floor(Math.random() * (new Date().getFullYear() - 1886 + 1)) + 1886,
    licensePlate: generateUniqueLicensePlate(),
    color: ['preto', 'branco', 'vermelho', 'azul', 'verde'][
      Math.floor(Math.random() * 5)
    ],
    renavam: generateUniqueRenavam(),
    price: Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000,
  };

  return randomVehicleDto;
};

export const createManyRandomVehicles = (count: number): VehicleCreateDto[] => {
  const vehicles = [];
  for (let i = 0; i < count; i++) {
    vehicles.push(createRandomVehicle(i));
  }
  return vehicles;
};

export const validateError = async (fn: any) => {
  try {
    return await fn();
  } catch (err) {
    return err.response;
  }
};
