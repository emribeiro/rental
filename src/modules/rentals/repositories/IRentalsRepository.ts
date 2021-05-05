import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/model/rental";


interface IRentalsRepository{

    findActiveRentalByCar(car_id: string): Promise<Rental>;
    findActiveRentalByUser(user_id: string): Promise<Rental>;
    create(data : ICreateRentalDTO) : Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository }