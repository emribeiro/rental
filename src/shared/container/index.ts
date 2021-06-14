import { container } from "tsyringe";

import "./providers"

import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../modules/accounts/repository/IUserRepository";
import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/categoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/specificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repository/ISpecificationRepository";
import { ICarsRepository } from "../../modules/cars/repository/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/carsRepository";
import { ICarsImageRepository } from "../../modules/cars/repository/ICarsImageRepository";
import { CarsImageRepository } from "../../modules/cars/infra/typeorm/repositories/carsImageRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IUsersTokenRepository } from "../../modules/accounts/repository/IUsersTokenRepository";
import { UsersTokenRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository";


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository" ,
  CategoriesRepository  
);


container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);


container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
)