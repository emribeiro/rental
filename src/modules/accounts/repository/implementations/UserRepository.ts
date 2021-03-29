import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUserRepository } from "../IUserRepository";


class UserRepository implements IUserRepository{

    private repository :Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    async create({name, username, password, email, driver_license}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            username,
            password,
            email,
            driver_license
        });

        await this.repository.save(user);

        return user;
    }

}

export { UserRepository }