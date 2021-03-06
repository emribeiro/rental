import { Router } from 'express';

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import multer from 'multer';
import { ListCategoryController } from '../../../../modules/cars/useCases/listCategory/ListCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/importCategoryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRouter = Router()

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRouter.post("/", 
                        ensureAuthenticated,
                        ensureAdmin,
                        createCategoryController.handle);
categoriesRouter.get("/", listCategoryController.handle);
categoriesRouter.post( "/import"
                     , ensureAuthenticated
                     , ensureAdmin
                     , upload.single("file")
                     , importCategoryController.handle);

export {categoriesRouter};