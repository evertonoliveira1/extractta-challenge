import { UsersService } from 'src/modules/auth/users.service';
import { VehiclesService } from 'src/modules/vehicles/vehicles.service';
import mockedVehicles from './vehicles.json';

export async function seed(app) {
  const usersService = app.get(UsersService);
  const vehiclesService = app.get(VehiclesService);

  const [savedUsers, savedVehicles] = await Promise.all([
    usersService.findAll(),
    vehiclesService.findAll()
  ]);

  if (savedUsers.length <= 0) {
    const password = process.env.ROOT_USER_PASSWORD;
    const hashedPassword = await usersService.hashPassword(password);

    const rootUser = {
      username: 'user_root',
      password: hashedPassword,
      email: 'user@mail.com',
    };

    await usersService.create(rootUser);
  }

  console.info('Injeção dos dados de Usuário finalizada.');

  if (savedVehicles.data.length <= 0) { 
    for (const mockedVehicle of mockedVehicles) {
      await vehiclesService.create({
        title: `${mockedVehicle.brand} | ${mockedVehicle.vehicleModel} | ${mockedVehicle.year} | ${mockedVehicle.color}`,
        ...mockedVehicle,
      });
    }
  }
  
  console.info('Injeção dos dados dos automóveis finalizada.');
}
