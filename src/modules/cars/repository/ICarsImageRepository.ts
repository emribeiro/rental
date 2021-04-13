import { CarImage } from "../infra/typeorm/model/carImage";

interface ICarsImageRepository{

    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImageRepository }