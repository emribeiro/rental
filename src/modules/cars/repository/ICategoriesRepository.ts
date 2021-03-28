import { Category } from "../model/category";

interface ICategoryDTO{
    name: string;
    description: string
}

interface ICategoriesRepository{
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name, description}: ICategoryDTO): Promise<Category>
}

export {
    ICategoriesRepository, ICategoryDTO
}