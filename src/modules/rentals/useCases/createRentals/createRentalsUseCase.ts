

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/model/rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



interface IRequest{
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

class CreateRentalsUseCase{

    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider
    ){}

    async execute({car_id, user_id, expected_return_date} : IRequest): Promise<Rental>{

        const MINIMAL_RENT_HOURS = 24;

        const activeCarRental = await this.rentalsRepository.findActiveRentalByCar(car_id);

        if(activeCarRental){
            throw new AppError("Car already have active Rental");
        }

        const activeUserRental = await this.rentalsRepository.findActiveRentalByUser(user_id);

        if(activeUserRental){
            throw new AppError("User already have a active Rental");      
        }

        
        const compare = this.dateProvider.compareInHours(this.dateProvider.now(), expected_return_date);

        if(compare < MINIMAL_RENT_HOURS){
            throw new AppError("The minimum time for a Rental is 24 hours");
        }


        const rental = await this.rentalsRepository.create({car_id, user_id, expected_return_date});


        return rental;

    }

}

export { CreateRentalsUseCase }