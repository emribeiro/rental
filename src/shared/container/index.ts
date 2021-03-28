import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repository/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repository/implementations/categoriesRepository";


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository" ,
  CategoriesRepository  
);