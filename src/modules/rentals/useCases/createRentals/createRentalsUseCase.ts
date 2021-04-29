

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { CarsRepository } from "../../../cars/infra/typeorm/repositories/carsRepository";
import { Rental } from "../../infra/typeorm/model/rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";



interface IRequest{
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalsUseCase{

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: CarsRepository
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

        await this.carsRepository.updateAvaliable(car_id, false);


        return rental;

    }

}

export { CreateRentalsUseCase }