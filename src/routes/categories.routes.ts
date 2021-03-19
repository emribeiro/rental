import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory/index'
import { listCategoryController } from '../modules/cars/useCases/listCategory';
import multer from 'multer';

const categoriesRouter = Router()

const upload = multer({
    dest: './tmp',
});

categoriesRouter.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRouter.get("/", (request, response) => {
    return listCategoryController.handle(request, response);
});

categoriesRouter.post("/import", upload.single("file"), (request, response) => {
    const { file } = request;
    console.log(file);
    
    
    return response.status(200).send();
});

export {categoriesRouter};