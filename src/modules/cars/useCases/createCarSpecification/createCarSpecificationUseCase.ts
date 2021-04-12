import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Car } from "../../infra/typeorm/model/car";
import { ICarsRepository } from "../../repository/ICarsRepository";
import { ISpecificationRepository } from "../../repository/ISpecificationRepository";


interface IRequest{
    car_id: string;
    specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase{


    constructor(
        @inject("CarsRepository")
        private carsRepository : ICarsRepository,
        
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists){
            throw new AppError("Car does not exists");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);


        carExists.specifications = specifications;


        await this.carsRepository.create(carExists);

        return carExists;
    }

}

export { CreateCarSpecificationUseCase }