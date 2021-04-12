import { Specification } from "../../infra/typeorm/model/specification";
import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";


class SpecificationRepositoryInMemory implements ISpecificationRepository{
    
    private repository : Specification[] = [];
    
    async list(): Promise<Specification[]> {
        return this.repository;
    }
    async findByName(name: string): Promise<Specification> {
        return this.repository.find(specification => specification.name === name);
    }
    async create({ name, description }: ISpecificationDTO): Promise<Specification> {

        const specification = new Specification();

        Object.assign(specification, {name, description});

        this.repository.push(specification)

        return specification;
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.repository.filter(specification => ids.includes(specification.id));

        return allSpecifications;
    }

}

export { SpecificationRepositoryInMemory }