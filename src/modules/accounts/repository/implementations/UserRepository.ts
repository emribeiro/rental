import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUserRepository } from "../IUserRepository";


class UserRepository implements IUserRepository{

    private repository :Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    async findById(id: any): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }
    async findByEmail(email: any): Promise<User> {
        const user = await this.repository.findOne({email});

        return user;
    }

    async create({name, password, email, driver_license, avatar, id}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license, 
            avatar,
            id
        });

        await this.repository.save(user);

        return user;
    }

}

export { UserRepository }