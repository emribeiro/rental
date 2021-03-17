import { ICategoriesRepository } from "../repository/ICategoriesRepository";

interface IRequest{
    name: string,
    description: string
}

class CreateCategoryService{
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({name, description}: IRequest){
        if(this.categoriesRepository.findByName(name)){
            throw new Error("Category Already Exists");
        }
        const category = this.categoriesRepository.create({name, description});
    }
}

export { CreateCategoryService }