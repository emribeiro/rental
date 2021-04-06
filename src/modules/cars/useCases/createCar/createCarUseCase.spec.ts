import e from "express";
import "reflect-metadata";
import { AppError } from "../../../../errors/AppError";
import { ICarsRepository } from "../../repository/ICarsRepository";
import { CarRepositoryInMemory } from "../../repository/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase"


let createCarUseCase : CreateCarUseCase;
let carsRepository: ICarsRepository;

describe("Create car", () => {

    beforeEach(() => {
        carsRepository = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Car test name", 
            description: "Car test description",
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Test brand", 
            category_id: "category"
        });

        const createdCar = await carsRepository.findByLicensePlate("ABC-1234");

        expect(createdCar).toHaveProperty("id");
    });
    
    it("Should not be able to create a car with same license plate", () => {
        expect( async ()=> {
            await createCarUseCase.execute({
                name: "Car test name 1", 
                description: "Car test description",
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 60, 
                brand: "Test brand", 
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Car test name 2", 
                description: "Car test description",
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 60, 
                brand: "Test brand", 
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create a car with availability true by default ", async () => {
            await createCarUseCase.execute({
                name: "Car test name 1", 
                description: "Car test description",
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 60, 
                brand: "Test brand", 
                category_id: "category"
            });

            const createdCar = await carsRepository.findByLicensePlate("ABC-1234");

            expect(createdCar.avaliable).toBe(true);

    });

})