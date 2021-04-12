import { CarRepositoryInMemory } from "../../repository/in-memory/CarRepositoryInMemory";
import { ListAvaliableCarsUseCase } from "./listAvaliableCarsUseCase";

let listAvaliableCarsUseCase : ListAvaliableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List Avaliable Cars", () => {

    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory()
        listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(carRepositoryInMemory);
    });

    it("should be able to list all avaliable cars", async () => {
        carRepositoryInMemory.create({
                name: "Car1", 
                description: "Celtinha zero bala",
                daily_rate: 250, 
                license_plate: "JKa-2234", 
                fine_amount: 60,  
                brand: "Chevrolet", 
                category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
        });

        carRepositoryInMemory.create({
            name: "Car2", 
            description: "Celtinha zero bala",
            daily_rate: 250, 
            license_plate: "JKB-2234", 
            fine_amount: 60,  
            brand: "Chevrolet", 
            category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
    });

        expect((await listAvaliableCarsUseCase.execute({})).length).toBeGreaterThan(1);
    });

    it("should be able to list all avaliable cars by Brand", async () => {
        carRepositoryInMemory.create({
                name: "Car1", 
                description: "Celtinha zero bala",
                daily_rate: 250, 
                license_plate: "JKa-2234", 
                fine_amount: 60,  
                brand: "Chevrolet", 
                category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
        });

        carRepositoryInMemory.create({
            name: "Car2", 
            description: "Celtinha zero bala",
            daily_rate: 250, 
            license_plate: "JKB-2234", 
            fine_amount: 60,  
            brand: "Ford", 
            category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
    });

        expect((await listAvaliableCarsUseCase.execute({
            brand: "Ford"
        })).length).toEqual(1);
    });

    it("should be able to list all avaliable cars by name", async () => {
        carRepositoryInMemory.create({
                name: "Car1", 
                description: "Celtinha zero bala",
                daily_rate: 250, 
                license_plate: "JKa-2234", 
                fine_amount: 60,  
                brand: "Chevrolet", 
                category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
        });

        carRepositoryInMemory.create({
            name: "Car2", 
            description: "Celtinha zero bala",
            daily_rate: 250, 
            license_plate: "JKB-2234", 
            fine_amount: 60,  
            brand: "Chevrolet", 
            category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
    });

        expect((await listAvaliableCarsUseCase.execute({
            name: "Car2"
        })).length).toEqual(1);
    });

    it("should be able to list all avaliable cars by category", async () => {
        carRepositoryInMemory.create({
                name: "Car1", 
                description: "Celtinha zero bala",
                daily_rate: 250, 
                license_plate: "JKa-2234", 
                fine_amount: 60,  
                brand: "Chevrolet", 
                category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
        });

        carRepositoryInMemory.create({
            name: "Car2", 
            description: "Celtinha zero bala",
            daily_rate: 250, 
            license_plate: "JKB-2234", 
            fine_amount: 60,  
            brand: "Chevrolet", 
            category_id: "90dc0697-377f-45a5-9791-2d62350814fd" 
    });

        expect((await listAvaliableCarsUseCase.execute({
            category_id: "90dc0697-377f-45a5-9791-2d62350814fd"
        })).length).toEqual(2);
    });
});