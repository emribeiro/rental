import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUserRepository } from "../../repository/IUserRepository";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository : IUserRepository
    ){};

    async execute({name, username, password, email, driver_license}: ICreateUserDTO): Promise<User>{
        const user = await this.userRepository
                                .create({ name,
                                          username,
                                          password, 
                                          email, 
                                          driver_license}); 
        
        return user;
    }
}

export { CreateUserUseCase }