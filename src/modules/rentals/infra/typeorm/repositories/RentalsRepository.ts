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
        return await this.repository.findOne( {
            where: {car_id, end_date: null}
        });
    }
    async findActiveRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: {user_id, end_date: null}
        });
    }
    async create(
        { car_id
        , user_id
        , expected_return_date
        , id
        , end_date
        , total}: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            start_date: new Date(),
            expected_return_date,
            id,
            end_date,
            total
        });

        await this.repository.save(rental);


        return rental;
    }


    async findById(id: string): Promise<Rental> {
        return await this.repository.findOne(id);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return await this.repository.find(
            {
                where: {user_id},
                relations: ["car"]
            }
        );
    }

}

export { RentalsRepository }