import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repository/ICarsRepository";
import { Car } from "../model/car";


class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car);
    }

    async create({
        name, 
        description,
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand, 
        category_id

    }: ICreateCarDTO): Promise<void> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });

        await this.repository.save(car);

    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate});

        return car;
    }

}

export { CarsRepository}