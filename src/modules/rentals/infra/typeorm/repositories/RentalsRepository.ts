import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../model/rental";


class RentalsRepository implements IRentalsRepository{

    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }

    async findActiveRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({car_id})
    }
    async findActiveRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({user_id})
    }
    async create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            start_date: new Date(),
            expected_return_date
        });

        await this.repository.save(rental);


        return rental;
    }


}

export { RentalsRepository }