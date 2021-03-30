import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";


import { IUserRepository } from "../../repository/IUserRepository";


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
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UserRepository") 
        private usersRepository: IUserRepository
    ){}

    async execute({email, password} : IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect! 2");
        }

        const token = sign({}, "c4b424ad27e0ec1935cb78e8d5af5657", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn : IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }

}

export { AuthenticateUserUseCase}