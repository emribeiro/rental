import { Router } from 'express';

const categories = [];
const categoriesRouter = Router();


categoriesRouter.post("/categories", (request, response) => {
    const { name, description } = request.body;

    const category = {
        name,
        description
    };

    categories.push(category);

    return response.status(201).send(category);
});

export {categoriesRouter};