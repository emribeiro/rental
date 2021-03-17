import { Router } from 'express';
import { Category } from '../model/category';
import { CategoriesRepository } from '../repository/categoriesRepository';



const categoriesRouter = Router()
const categoriesRepository = new CategoriesRepository();


categoriesRouter.post("/", (request, response) => {
    const { name, description } = request.body;

    if(categoriesRepository.findByName(name)){
        return response.status(400).send({error: "Category Already Exists"});
    }
    const category = categoriesRepository.create({name, description});

    return response.status(201).send(category);
});

categoriesRouter.get("/", (request, response) => {
    const all = categoriesRepository.list();

    return response.status(200).send(all);
});

export {categoriesRouter};