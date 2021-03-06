import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/model/User";
import { IUserRepository } from "../../repository/IUserRepository";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository : IUserRepository
    ){};

    async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<User>{

        const passwordHash = await hash(password, 8);

        const user = await this.userRepository
                                .create({ name,
                                          password: passwordHash, 
                                          email, 
                                          driver_license}); 
        
        return user;
    }
}

export { CreateUserUseCase }