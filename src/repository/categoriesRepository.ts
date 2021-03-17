import { response } from "express";
import { Category } from "../model/category";
import { ICategoriesRepository, ICategoryDTO } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{

    private categories: Category[];

    constructor(){
        this.categories = [];
    }

    create({name, description}: ICategoryDTO): Category{

        const category = new Category();
        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category);
        return category;
    }

    list(): Category[]{
        return this.categories;
    }


    findByName(name: String): Category{
        const category = this.categories.find(category => category.name === name);

        return category;
    }
 


}

export { CategoriesRepository }