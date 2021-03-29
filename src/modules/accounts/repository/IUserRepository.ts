import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../model/User";


interface IUserRepository{
    create(data : ICreateUserDTO) : Promise<User>
}

export { IUserRepository }