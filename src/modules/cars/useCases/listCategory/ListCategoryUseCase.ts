import { Category } from "../../model/category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

class ListCategoryUseCase{
    constructor(private categoryRepository: ICategoriesRepository) {}

    async execute(): Promise<Category[]>{
        const categories = await this.categoryRepository.list();

        return categories;
    }
}

export {ListCategoryUseCase}