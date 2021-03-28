import { CategoriesRepository } from "../../repository/implementations/categoriesRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export default () => {
    const categoriesRepository = new CategoriesRepository();
    const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
    const importCategoryController = new ImportCategoryController(importCategoryUseCase);


    return importCategoryController;
}