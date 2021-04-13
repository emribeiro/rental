import dayjs from "dayjs";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "./createRentalsUseCase"

let createRentalsUseCase : CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: IDateProvider;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalsUseCase = new CreateRentalsUseCase( rentalsRepositoryInMemory
                                                        , dayjsDateProvider 
                                                       );
    });

    it("should be able to create a rental", async () => {

        const rental = await createRentalsUseCase.execute({
            car_id: "12345",
            user_id: "988897",
            expected_return_date: dayjs().add(1, "day").toDate()
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");

    });

    it("should not be able to create a rental with another active rental for the same user.", () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: "12345",
                user_id: "988897",
                expected_return_date: new Date()
            });
    
            const rental = await createRentalsUseCase.execute({
                car_id: "12345",
                user_id: "988897",
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental with another active rental for the same car.", () => {

        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: "12345",
                user_id: "988897",
                expected_return_date: new Date()
            });
    
            const rental = await createRentalsUseCase.execute({
                car_id: "12345",
                user_id: "9888978",
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);
    });


    it("should not be able to create a rental with less than 24 hours",  () => {

        expect(async () => {
            const rental = await createRentalsUseCase.execute({
                car_id: "12345",
                user_id: "988897",
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);



    });

})