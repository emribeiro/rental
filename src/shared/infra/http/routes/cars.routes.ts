import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvaliableCarsController } from "../../../../modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/uploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const carsRouter = Router();

const upload = multer(uploadConfig); 

carsRouter.post("/"
                , ensureAuthenticated
                , ensureAdmin
                , createCarController.handle);

carsRouter.get("/avaliable", listAvaliableCarsController.handle);

carsRouter.post("/specifications/:id"
                , ensureAuthenticated
                , ensureAdmin
                ,createCarSpecificationController.handle);


carsRouter.post("/images/:id"
               , ensureAuthenticated
               , ensureAdmin
               , upload.array("images")
               , uploadCarImageController.handle);

export {carsRouter}
