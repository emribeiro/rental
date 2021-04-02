import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../modules/accounts/repository/IUserRepository";
import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/categoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/specificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repository/ISpecificationRepository";


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