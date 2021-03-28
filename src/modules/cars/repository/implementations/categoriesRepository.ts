import { getRepository, Repository } from "typeorm";
import { Category } from "../../model/category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{

    private repository : Repository<Category>;

    constructor(){
        this.repository = getRepository(Category);
    }

    async create({name, description}: ICategoryDTO): Promise<Category>{

        const category = this.repository.create({
            name,
            description
        });

        await this.repository.save(category);

        return category;
    }

    async list(): Promise<Category[]>{
        return await this.repository.find();
    }


    async findByName(name: string): Promise<Category>{
        const category = await this.repository.findOne({ name });

        return category;
    }
 


}

export { CategoriesRepository }