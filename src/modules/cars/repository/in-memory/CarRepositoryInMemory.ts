import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/model/car";
import { ICarsRepository } from "../ICarsRepository";



class CarRepositoryInMemory implements ICarsRepository{

    private cars : Car[];

    constructor(){
        this.cars = [];
    }

    async create({ name
           , description
           , daily_rate
           , license_plate
           , fine_amount
           , brand
           , category_id}: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car, {
            name
           , description
           , daily_rate
           , license_plate
           , fine_amount
           , brand
           , category_id
        });

        this.cars.push(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car>{
        const car = this.cars.find(car => car.license_plate === license_plate);

        return car;
    }

}

export { CarRepositoryInMemory }