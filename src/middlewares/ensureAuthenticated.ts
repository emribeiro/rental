import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repository/implementations/UserRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token Missing", 401);
    }

    const [, token] = authHeader.split(" ");


    try{
        const { sub : user_id} = verify(token, "c4b424ad27e0ec1935cb78e8d5af5657") as IPayload;
        
        const userRepository = new UserRepository();
        const user = userRepository.findById(user_id);

        if(!user){
            throw new AppError("User not Exists", 401);
        }

        request.user = {
            id: user_id
        };

        next();
    }catch{
        throw new AppError("Invalid token", 401);
    }
}