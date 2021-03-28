import { CategoriesRepository } from "../../repository/implementations/categoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./createCategoryUseCase";


export default () => {
    const categoriesRepository = new CategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    
    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController;
}