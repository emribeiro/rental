import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalsUseCase } from "./createRentalsUseCase";


class CreateRentalsController{

    async handle(request: Request, response: Response): Promise<Response>{

        const {car_id, expected_return_date} = request.body;

        const user_id = request.user.id;

        const createRentalUseCase = container.resolve(CreateRentalsUseCase);

        const rental = await createRentalUseCase.execute({car_id, user_id, expected_return_date});

        
        return response.status(201).json(rental);
    }

}

export { CreateRentalsController }