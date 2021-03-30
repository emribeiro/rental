import {inject, injectable} from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { Category } from "../../model/category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

interface IRequest{
    name: string,
    description: string
}


@injectable()
class CreateCategoryUseCase{

    
    constructor(
        @inject("CategoriesRepository")    
        private categoriesRepository: ICategoriesRepository) {}

    async execute({name, description}: IRequest): Promise<Category>{
        if(await this.categoriesRepository.findByName(name)){
            throw new AppError("Category Already Exists");
        }
        const category = await this.categoriesRepository.create({name, description});

        return category;
    }
}

export { CreateCategoryUseCase }