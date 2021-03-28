import { Router } from 'express';

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import multer from 'multer';
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';

const categoriesRouter = Router()

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRouter.post("/", createCategoryController.handle);
categoriesRouter.get("/", listCategoryController.handle);
categoriesRouter.post("/import", upload.single("file"), importCategoryController.handle);

export {categoriesRouter};