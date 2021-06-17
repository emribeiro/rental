import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/mailProvider/implementations/in-memory/MailProviderInMemory";
import { UserRepositoryInMemory } from "../../repository/in-memory/UserRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../repository/in-memory/UsersTokenRepositoryInMemory";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUsersTokenRepository } from "../../repository/IUsersTokenRepository";
import { SendForgotPasswordEmailUseCase } from "./sendForgotPasswordEmailUseCase";


let sendForgotEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepositoryInMemory: IUserRepository;
let usersTokenRepositoryInMemory: IUsersTokenRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;


describe("Send forgotten email", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotEmailUseCase = new SendForgotPasswordEmailUseCase(usersRepositoryInMemory
                                                                    , usersTokenRepositoryInMemory
                                                                    , dateProvider
                                                                    , mailProvider);

    });


    it("should be able to send a forgot password mail to a user", async () => {
        
        const sendMail = spyOn(mailProvider, "sendMail");
        
        await usersRepositoryInMemory.create({
            driver_license: "2962926821",
            email: "meclalvek@wufuneba.im",
            name: "Joe Dixon",
            password: "1234"
        });

        await sendForgotEmailUseCase.execute("meclalvek@wufuneba.im");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a email to inexistent user", async () => {
        await expect(
            sendForgotEmailUseCase.execute("ka@uj.gr")
        ).rejects.toEqual(new AppError("User not found!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(usersTokenRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "2962926821",
            email: "meclalvek@wufuneba.im",
            name: "Joe Dixon",
            password: "1234"
        });

        await sendForgotEmailUseCase.execute("meclalvek@wufuneba.im");

        expect(generateTokenMail).toBeCalled();

    });
});