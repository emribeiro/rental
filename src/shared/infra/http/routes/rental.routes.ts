import { Router } from "express";
import { CreateRentalsController } from "../../../../modules/rentals/useCases/createRentals/createRentalsController";
import { DevolutionRentalsController } from "../../../../modules/rentals/useCases/devolutionRentals/devolutionRentalsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalsController = new DevolutionRentalsController();

rentalRoutes.post("/", ensureAuthenticated, createRentalsController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalsController.handle);

export {
    rentalRoutes
}