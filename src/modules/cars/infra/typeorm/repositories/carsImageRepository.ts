import { getRepository, Repository } from "typeorm";
import { ICarsImageRepository } from "../../../repository/ICarsImageRepository";
import { CarImage } from "../model/carImage";


class CarsImageRepository implements ICarsImageRepository{
    
    private repository: Repository<CarImage>;

    constructor(){
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        });

        await this.repository.save(carImage);

        return carImage;

    }

}

export { CarsImageRepository }