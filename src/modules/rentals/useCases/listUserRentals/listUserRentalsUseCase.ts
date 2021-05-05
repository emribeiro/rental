import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/model/rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



@injectable()
class ListUserRentalsUseCase {

    constructor( 
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}


    async execute(user_id: string): Promise<Rental[]>{

        const rentals = await this.rentalsRepository.findByUser(user_id);

        return rentals;
    }

}


export {ListUserRentalsUseCase }