import { Category } from "../../model/category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

interface IRequest{
    name: string,
    description: string
}

class CreateCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({name, description}: IRequest): Promise<Category>{
        if(await this.categoriesRepository.findByName(name)){
            throw new Error("Category Already Exists");
        }
        const category = await this.categoriesRepository.create({name, description});

        return category;
    }
}

export { CreateCategoryUseCase }