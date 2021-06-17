import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repository/in-memory/UserRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../repository/in-memory/UsersTokenRepositoryInMemory";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUsersTokenRepository } from "../../repository/IUsersTokenRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase : AuthenticateUserUseCase;
let userRepositoryInMemory : IUserRepository;
let createUserUseCase : CreateUserUseCase;
let userTokenRepositoryInMemory: IUsersTokenRepository;
let dateProvider : IDateProvider;

describe("Authenticate User", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory, userTokenRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "RK982F",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an inexistent user", () => {
        expect( async () => { 
            await authenticateUserUseCase.execute({
            email: "fals@gmail.com",
            password: "987689"
            })
    }   ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect( async ()=> {
            const user: ICreateUserDTO = {
                driver_license: "RK982F",
                email: "user2@test.com",
                password: "3389",
                name: "User Test"
            };
    
            await createUserUseCase.execute(user);

            const result = await authenticateUserUseCase.execute({
                email: user.email,
                password: "4489"
            });
        }).rejects.toBeInstanceOf(AppError);
    });


});