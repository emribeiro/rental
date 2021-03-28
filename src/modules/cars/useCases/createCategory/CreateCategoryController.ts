import { CreateCategoryUseCase } from "./createCategoryUseCase";
import { container } from "tsyringe";

class CreateCategoryController{

    async handle(request, response){
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);


        const category = await createCategoryUseCase.execute({ name, description });

        return response.status(201).json(category);
    }
}

export { CreateCategoryController }