import { Router } from 'express';
import  { v4 as uuidV4} from 'uuid';

const categories = [];
const categoriesRouter = Router()


categoriesRouter.post("/", (request, response) => {
    const { name, description } = request.body;

    const category = {
        id: uuidV4(),
        name,
        description,
        created_at: new Date()
    };

    categories.push(category);

    return response.status(201).send(category);
});

export {categoriesRouter};