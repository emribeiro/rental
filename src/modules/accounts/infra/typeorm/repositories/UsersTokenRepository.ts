import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../../../repository/IUsersTokenRepository";
import { UserToken } from "../model/UserToken";


class UsersTokenRepository implements IUsersTokenRepository{
    
    private repository: Repository<UserToken>;
    
    constructor(){
        this.repository = getRepository(UserToken);
    }
    
    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken;
    }


}

export {UsersTokenRepository}