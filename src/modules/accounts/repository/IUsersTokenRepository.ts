import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/model/UserToken";


interface IUsersTokenRepository{

    create({user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<UserToken>;
}

export {IUsersTokenRepository}