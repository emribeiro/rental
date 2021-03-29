import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repository/implementations/categoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repository/implementations/specificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repository/ISpecificationRepository";


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository" ,
  CategoriesRepository  
);


container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);