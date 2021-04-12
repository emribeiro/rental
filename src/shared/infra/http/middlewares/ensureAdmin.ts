import { NextFunction, Request, Response} from "express";
import { AppError } from "../../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction 
){
    const { id } = request.user;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if(!user.admin){
        throw new AppError("User is Not Admin!");
    }

    return next();

}