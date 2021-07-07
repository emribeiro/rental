import { Router } from "express";
import { CreateRentalsController } from "../../../../modules/rentals/useCases/createRentals/createRentalsController";
import { DevolutionRentalsController } from "../../../../modules/rentals/useCases/devolutionRentals/devolutionRentalsController";
import { ListUserRentalsController } from "../../../../modules/rentals/useCases/listUserRentals/listUserRentalsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalsController = new DevolutionRentalsController();
const listUserRentalsController = new ListUserRentalsController();

rentalRoutes.post("/", ensureAuthenticated, createRentalsController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalsController.handle);
rentalRoutes.get("/", ensureAuthenticated, listUserRentalsController.handle);


export {
    rentalRoutes
} 