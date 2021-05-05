import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { ICarsRepository } from "../../../cars/repository/ICarsRepository";
import { Rental } from "../../infra/typeorm/model/rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    rental_id: string,
    user_id: string
}


@injectable()
class DevolutionRentalUseCase{

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({rental_id, user_id}: IRequest): Promise<Rental>{

        const rental = await this.rentalsRepository.findById(rental_id);
        const car = await this.carsRepository.findById(rental.car_id);

        if(!rental){
            throw new AppError("Rental does not exists");
        }

        const MIMINUM_DAILY = 1;
        const now = this.dayjsDateProvider.now();

        let daily = 
        this.dayjsDateProvider.compareInDays(
            rental.start_date,
            now
        );

        if(daily <= 0 ){
            daily = MIMINUM_DAILY;
        }

        let delay = 
        this.dayjsDateProvider.compareInDays(
            rental.expected_return_date,
            now
        );

        let total = daily * car.daily_rate;

        if (delay > 0){
            total += delay * car.fine_amount;
        }

        rental.end_date = now;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvaliable(car.id, true);

        return rental;

    }

}

export { DevolutionRentalUseCase }