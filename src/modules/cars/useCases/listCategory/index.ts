import { CategoriesRepository } from "../../repository/implementations/categoriesRepository";
import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export default () => {
    const categoryRepository = new CategoriesRepository();
    const listCategoryUseCase = new ListCategoryUseCase(categoryRepository);
    const listCategoryController = new ListCategoryController(listCategoryUseCase);

    return listCategoryController;
}
