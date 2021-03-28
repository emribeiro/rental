import { Router } from 'express';

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import listCategoryController  from '../modules/cars/useCases/listCategory';
import multer from 'multer';
import  importCategoryController  from '../modules/cars/useCases/importCategory';

const categoriesRouter = Router()

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();


categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", (request, response) => {
    return listCategoryController().handle(request, response);
});

categoriesRouter.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController().handle(request, response);
});

export {categoriesRouter};