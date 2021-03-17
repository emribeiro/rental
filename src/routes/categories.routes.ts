import { Router } from 'express';
import { Category } from '../model/category';
import { CategoriesRepository } from '../repository/categoriesRepository';
import { CreateCategoryService } from '../services/createCategoryService';



const categoriesRouter = Router()
const categoriesRepository = new CategoriesRepository();



categoriesRouter.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRouter.get("/", (request, response) => {
    const all = categoriesRepository.list();

    return response.status(200).send(all);
});

export {categoriesRouter};