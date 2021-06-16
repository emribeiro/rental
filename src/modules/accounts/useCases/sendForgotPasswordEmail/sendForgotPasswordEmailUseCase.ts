import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUsersTokenRepository } from "../../repository/IUsersTokenRepository";

import {v4 as uuidV4} from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";

import {resolve} from "path";


@injectable()
class SendForgotPasswordEmailUseCase{

    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealEmailProvider")
        private mailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs")

        if(!user){
            throw new AppError("User not found!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variables = { 
            name: user.name,
            link: `${process.env.FORGOT_EMAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(
            email,
            "Recuperação de Senha",
            variables, 
            templatePath
        );

    }

}

export { SendForgotPasswordEmailUseCase }