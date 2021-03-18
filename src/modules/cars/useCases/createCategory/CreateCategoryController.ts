import { CreateCategoryUseCase } from "./createCategoryUseCase";

class CreateCategoryController{
    constructor (private createCategoryUseCase : CreateCategoryUseCase) {}

    handle(request, response){
        const { name, description } = request.body;

        const category = this.createCategoryUseCase.execute({ name, description });

        return response.status(201).json(category);
    }
}

export { CreateCategoryController }