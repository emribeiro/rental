import { Category } from "../../model/category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{

    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor(){
        this.categories = [];
    }

    public static getInstance(){
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
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