import { Category } from "../model/category";

interface ICategoryDTO{
    name: string;
    description: string
}

class CategoriesRepository{

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

 


}

export { CategoriesRepository }