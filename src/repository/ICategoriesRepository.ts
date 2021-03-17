import { Category } from "../model/category";

interface ICategoryDTO{
    name: string;
    description: string
}

interface ICategoriesRepository{
    findByName(name: string): Category;
    list(): Category[];
    create({name, description}: ICategoryDTO);
}

export {
    ICategoriesRepository, ICategoryDTO
}