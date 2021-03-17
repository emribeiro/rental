import { Router } from 'express';
import { Category } from '../model/category';
import { CategoriesRepository } from '../repository/categoriesRepository';



const categoriesRouter = Router()
const categoryRepository = new CategoriesRepository();


categoriesRouter.post("/", (request, response) => {
    const { name, description } = request.body;

    const category = categoryRepository.create({name, description});

    return response.status(201).send(category);
});

export {categoriesRouter};