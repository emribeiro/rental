import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "../../repository/ICarsImageRepository";


interface IRequest{
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase{

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    ) {}

    async execute({car_id, images_name}): Promise<void>{
        images_name.map( async (image) => {
            await this.carsImageRepository.create(car_id, image);
        })
    }

}

export {UploadCarImageUseCase}