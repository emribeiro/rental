import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/model/car";
import { ICarsRepository } from "../../repository/ICarsRepository";

interface IRequest{
    brand?: string,
    category_id?: string,
    name?: string
}

@injectable()
class ListAvaliableCarsUseCase{

    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository
    ){}

    async execute({brand, category_id, name}: IRequest): Promise<Car[]>{
        const avaliableCars = this.carRepository.findAvaliable(brand, category_id, name);
       
        return avaliableCars;
    }

}

export { ListAvaliableCarsUseCase }