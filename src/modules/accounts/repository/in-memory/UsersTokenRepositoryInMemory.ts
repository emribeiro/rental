import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserToken } from "../../infra/typeorm/model/UserToken";
import { IUsersTokenRepository } from "../IUsersTokenRepository";


class UsersTokenRepositoryInMemory implements IUsersTokenRepository{
    usersToken: UserToken[] = [];
    
    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
        
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token
        });

        this.usersToken.push(userToken);

        return userToken;
    }
    findByUserId(user_id: string): Promise<UserToken[]> {
        throw new Error("Method not implemented.");
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        return this.usersToken.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token);
    }
    async deleteById(token_id: string): Promise<void> {
        const userToken = this.usersToken.find((ut) => ut.id === token_id);
        this.usersToken.splice(this.usersToken.indexOf(userToken))
    }
    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        return this.usersToken.find((ut) => ut.refresh_token === refresh_token);
    }

}


export { UsersTokenRepositoryInMemory }