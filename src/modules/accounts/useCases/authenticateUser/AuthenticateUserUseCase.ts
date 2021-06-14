import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";


import { IUserRepository } from "../../repository/IUserRepository";
import { IUsersTokenRepository } from "../../repository/IUsersTokenRepository";


interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UserRepository") 
        private usersRepository: IUserRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayJsDateProvider: IDateProvider
    ){}

    async execute({email, password} : IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        const { token_secret_key
              , token_expires_time
              , refresh_token_secret_key
              , refresh_token_expires_time
              , refresh_token_expires_days} = auth;

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, token_secret_key, {
            subject: user.id,
            expiresIn: token_expires_time
        });

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(refresh_token_expires_days)

        const refresh_token = sign({email}, refresh_token_secret_key, {
            subject: user.id,
            expiresIn: refresh_token_expires_time
        });

        await this.usersTokenRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token
        })
        const tokenReturn : IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }

        return tokenReturn;
    }

}

export { AuthenticateUserUseCase}