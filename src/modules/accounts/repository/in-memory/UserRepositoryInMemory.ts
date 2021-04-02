import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUserRepository } from "../IUserRepository";



class UserRepositoryInMemory implements IUserRepository{

    private users : User[];

    constructor() {
        this.users = [];
    }

    async create({driver_license, email, name, password}: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            name, 
            email, 
            password,
            driver_license,
            created_at: new Date()
        });

        this.users.push(user);

        return user;

    }

    async findByEmail(email: any): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    async findById(id: any): Promise<User> {
        const user = this.users.find(user => user.id === id);

        return user;
    }

}


export {UserRepositoryInMemory}