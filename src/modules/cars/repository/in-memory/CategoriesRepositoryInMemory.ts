import { Category } from "../../infra/typeorm/model/category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";


class CategoriesRepositoriesInMemory implements ICategoriesRepository{

    private categories : Category[] = []

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);

        return category;
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async create({ name, description }: ICategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);

        return category;
    }

}

export { CategoriesRepositoriesInMemory }