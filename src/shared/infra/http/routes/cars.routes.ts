import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";

const createCarController = new CreateCarController();

const carsRouter = Router();

carsRouter.post("/", createCarController.handle);

export {carsRouter}
