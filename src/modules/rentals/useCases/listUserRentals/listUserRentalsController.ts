import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserRentalsUseCase } from "./listUserRentalsUseCase";


class ListUserRentalsController{

    async handle(request: Request, response: Response): Promise<Response>{
        const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);
        const {id} = request.user;

        const rentals = await listUserRentalsUseCase.execute(id);

        return response.status(200).send(rentals);



    }

}

export { ListUserRentalsController }