import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import { CreateSpecificationUseCase } from "./createSpecificationUseCase";

class CreateSpecificationController{

    handle(request: Request, response: Response): Response{
        const {name, description} = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        const specification = createSpecificationUseCase.execute({name, description});
    
        return response.status(201).send(specification);  
    }
}

export { CreateSpecificationController }