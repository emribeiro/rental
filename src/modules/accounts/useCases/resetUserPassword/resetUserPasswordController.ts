import { container } from "tsyringe"
import { ResetUserPasswordUseCase } from "./resetUserPasswordUseCase"
import { Request, Response} from "express";


class ResetUserPasswordController{

    async handle(request: Request, response: Response) : Promise<Response>{
        const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase);

        const { token } = request.query;
        const { password} = request.body;

        resetUserPasswordUseCase.execute({token: String(token), password});

        return response.status(200).send();
    }

}

export { ResetUserPasswordController}