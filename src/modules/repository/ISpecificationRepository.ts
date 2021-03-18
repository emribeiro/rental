import { Specification } from "../model/specification";


interface ISpecificationDTO{
    name: string;
    description: string
}

interface ISpecificationRepository{
    list(): Specification [];
    findByName(name: string) : Specification;
    create({ name, description} : ISpecificationDTO) : Specification ;
}


export { ISpecificationDTO, ISpecificationRepository}