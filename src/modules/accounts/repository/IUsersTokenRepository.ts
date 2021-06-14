import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/model/UserToken";


interface IUsersTokenRepository{

    create({user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserId(user_id: string): Promise<UserToken[]>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
    deleteById(token_id: string): Promise<void>;
}

export {IUsersTokenRepository}