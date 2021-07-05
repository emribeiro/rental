import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IUsersTokenRepository } from "../../repository/IUsersTokenRepository";


interface IPayload{
    sub: string;
    email: string;
}

interface ITokenResponse{
    token: string;
    refresh_token: string;
}
@injectable()
class RefreshTokenUseCase{

    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayJsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse>{
        const {email, sub} = verify(token, auth.refresh_token_secret_key) as IPayload;

        const user_id = sub;

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken){
            throw new AppError("Invalid Refresh Token!");
        }

        await this.usersTokenRepository.deleteById(userToken.id);

        const refresh_token = sign({email}, auth.refresh_token_secret_key, {
            subject: userToken.user_id,
            expiresIn: auth.refresh_token_expires_time
        });

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(auth.refresh_token_expires_days);

        await this.usersTokenRepository.create({
            user_id: userToken.user_id,
            expires_date: refresh_token_expires_date,
            refresh_token
        });

        const newToken = sign({}, auth.token_secret_key, {
            subject: user_id,
            expiresIn: auth.token_expires_time
        })
        return {
            refresh_token,
            token: newToken
        };

    }

}

export {RefreshTokenUseCase}