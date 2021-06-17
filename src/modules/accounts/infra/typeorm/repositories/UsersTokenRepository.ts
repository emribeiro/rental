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

    async findByUserId(user_id: string): Promise<UserToken[]> {
        return await this.repository.find({user_id});
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        return await this.repository.findOne({ user_id, refresh_token});
    }

    async deleteById(token_id: string): Promise<void>{
        await this.repository.delete(token_id);
    }
    
    async findByRefreshToken(refresh_token: string): Promise<UserToken>{
        return await this.repository.findOne({refresh_token});
    }

}

export {UsersTokenRepository}