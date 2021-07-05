import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokenRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    const userTokenRepository = new UsersTokenRepository;

    if(!authHeader){
        throw new AppError("Token Missing", 401);
    }

    const [, token] = authHeader.split(" ");


    try{
        const { sub : user_id} = verify(token, auth.token_secret_key) as IPayload;
        
        request.user = {
            id: user_id
        };

        next();
    }catch{
        throw new AppError("Invalid token", 401);
    }
}