import { AppError } from "../../../../errors/AppError";
import { CarRepositoryInMemory } from "../../repository/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repository/in-memory/SpecificationRepositoryInMemory";
import { CreateCarUseCase } from "../createCar/createCarUseCase";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";


let createCarSpecificationUseCase : CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory : SpecificationRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepositoryInMemory, specificationRepositoryInMemory);
        createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
    })

    it("Should not be able to create a Specification in a non existing car", async () => {
        expect(async () => {

            const car_id = "1234"
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({car_id, specifications_id});

        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should be able to add a new Specification to a car", async () => {
        const createdCar = await createCarUseCase.execute({
            name: "Car test name", 
            description: "Car test description",
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Test brand", 
            category_id: "category"
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test specification",
            description: "test specification description"
        })
        const specifications_id = [specification.id];

        const specificationCars = await createCarSpecificationUseCase.execute({
              car_id: createdCar.id
            , specifications_id});

        expect(specificationCars).toHaveProperty("specifications");
        expect(specificationCars.specifications.length).toBe(1);
    })

    
});