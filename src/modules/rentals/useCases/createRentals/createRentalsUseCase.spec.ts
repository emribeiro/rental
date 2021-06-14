import dayjs from "dayjs";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { User } from "../../../accounts/infra/typeorm/model/User";
import { UserRepositoryInMemory } from "../../../accounts/repository/in-memory/UserRepositoryInMemory";
import { Car } from "../../../cars/infra/typeorm/model/car";
import { CarRepositoryInMemory } from "../../../cars/repository/in-memory/CarRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "./createRentalsUseCase"

let createRentalsUseCase : CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarRepositoryInMemory;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dayjsDateProvider: IDateProvider;
let testCar: Car;
let testUser: User;

describe("Create Rental", () => {

     beforeEach( async () => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarRepositoryInMemory();
        usersRepositoryInMemory = new UserRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalsUseCase = new CreateRentalsUseCase( rentalsRepositoryInMemory
                                                        , dayjsDateProvider
                                                        , carsRepositoryInMemory 
                                                       );

        testUser = await usersRepositoryInMemory.create({
            driver_license: "KK24654",
            email: "teste@teste.com", 
            name: "Josenildo",
            password: "chico"    
        });

        testCar = await carsRepositoryInMemory.create({
            name: "testCar",
            description: "A Test Car",
            daily_rate: 33,
            license_plate: "RD23323",
            fine_amount: 888,
            brand: "Test Brand",
            category_id: "3332323"
        });

    });

    it("should be able to create a rental", async () => {

        const rental = await createRentalsUseCase.execute({
            car_id: testCar.id,
            user_id: testUser.id,
            expected_return_date: dayjs().add(1, "day").toDate()
        });

        expect(rental).toHaveProperty("id");

    });

    it("should not be able to create a rental with another active rental for the same user.", () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: testCar.id,
                user_id: testUser.id,
                expected_return_date: new Date()
            });
    
            const rental = await createRentalsUseCase.execute({
                car_id: testCar.id,
                user_id: testUser.id,
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental with another active rental for the same car.", () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: testCar.id,
                user_id: testUser.id,
                expected_return_date: new Date()
            });
    
            const rental = await createRentalsUseCase.execute({
                car_id: testCar.id,
                user_id: testUser.id,
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);
    });


    it("should not be able to create a rental with less than 24 hours",  () => {

        expect(async () => {
            const rental = await createRentalsUseCase.execute({
                car_id: testCar.id,
                user_id: testUser.id,
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);



    });

})