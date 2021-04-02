import { Specification } from "../infra/typeorm/model/specification";


interface ISpecificationDTO{
    name: string;
    description: string
}

interface ISpecificationRepository{
    list(): Promise<Specification[]>;
    findByName(name: string) : Promise<Specification>;
    create({ name, description} : ISpecificationDTO) : Promise<Specification> ;
}


export { ISpecificationDTO, ISpecificationRepository}