import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUsersTokenRepository } from "../../repository/IUsersTokenRepository";

interface IRequest{
    token: string,
    password: string
}

@injectable()
class ResetUserPasswordUseCase{

    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UserRepository") 
        private usersRepository: IUserRepository
    ){}
    async execute({token, password}: IRequest){

        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if(!userToken){
            throw new AppError("Invalid Token!");
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.now())){
            throw new AppError("Token Expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        user.password = await hash(password, 8);
        
        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id);

    }
}


export { ResetUserPasswordUseCase } 