import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/model/car";
import { ICarsRepository } from "../ICarsRepository";



class CarRepositoryInMemory implements ICarsRepository{

    private cars : Car[];

    constructor(){
        this.cars = [];
    }

    

    async create({ name
           , description
           , daily_rate
           , license_plate
           , fine_amount
           , brand
           , category_id
           , id}: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name
           , description
           , daily_rate
           , license_plate
           , fine_amount
           , brand
           , category_id
           , id
        });

        this.cars.push(car);
        
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car>{
        const car = this.cars.find(car => car.license_plate === license_plate);

        return car;
    }

    async findAvaliable(brand ?: string, category_id ?: string, name ?: string): Promise<Car[]>{
        const avaliableCars = this.cars.filter(car => {
            if(
                car.avaliable === true && 
                ( (brand && car.brand === brand) ||
                  (category_id && car.category_id === category_id) ||
                  (name && car.name === name)
                )
            ){
                return car;
            }else{
                if(car.avaliable === true && (!brand && !category_id && !name)){
                    return car;
                }else{
                    return null;
                }
            }
        })

        return avaliableCars;
    }

    async findById(id: string): Promise<Car>{
        return this.cars.find(car => car.id === id);
    }

    async updateAvaliable(id: string, avaliable: boolean): Promise<void> {
        const index = this.cars.findIndex(car => car.id === id);
        this.cars[index].avaliable = avaliable;
    
    }
}

export { CarRepositoryInMemory }