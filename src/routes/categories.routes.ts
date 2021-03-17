import { Router } from 'express';
import { Category } from '../model/category';


const categories: Category[] = [];
const categoriesRouter = Router()


categoriesRouter.post("/", (request, response) => {
    const { name, description } = request.body;

    const category = new Category();
    Object.assign(category, {
        name,
        description
    })

    categories.push(category);

    return response.status(201).send(category);
});

export {categoriesRouter};