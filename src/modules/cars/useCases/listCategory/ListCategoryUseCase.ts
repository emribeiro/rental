import { inject, injectable } from "tsyringe";
import { Category } from "../../model/category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

@injectable()
class ListCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository) {}

    async execute(): Promise<Category[]>{
        const categories = await this.categoryRepository.list();

        return categories;
    }
}

export {ListCategoryUseCase}