import { Category } from "../../model/category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

class ListCategoryUseCase{
    constructor(private categoryRepository: ICategoriesRepository) {}

    execute(): Category[]{
        const categories = this.categoryRepository.list();

        return categories;
    }
}

export {ListCategoryUseCase}