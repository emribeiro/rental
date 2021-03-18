import { CategoriesRepository } from "../../repository/implementations/categoriesRepository";
import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";


const categoryRepository = CategoriesRepository.getInstance();
const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export {listCategoryController}
