import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { ListAvaliableCarsController } from "../../../../modules/cars/useCases/listAvaliableCars/listAvaliableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();

const carsRouter = Router();

carsRouter.post("/"
                , ensureAuthenticated
                , ensureAdmin
                , createCarController.handle);

carsRouter.get("/avaliable", listAvaliableCarsController.handle);

export {carsRouter}
