import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvaliableCarsController } from "../../../../modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

const carsRouter = Router();

carsRouter.post("/"
                , ensureAuthenticated
                , ensureAdmin
                , createCarController.handle);

carsRouter.get("/avaliable", listAvaliableCarsController.handle);

carsRouter.post("/specifications/:id"
                , ensureAuthenticated
                , ensureAdmin
                ,createCarSpecificationController.handle);

export {carsRouter}
