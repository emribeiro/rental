import { getRepository, Repository } from "typeorm";
import { ISpecificationDTO, ISpecificationRepository } from "../../../repository/ISpecificationRepository";
import { Specification } from "../model/specification";

class SpecificationRepository implements ISpecificationRepository{
    private repository: Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification);
    }

    
    async list() : Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }
    async findByName(name: string) : Promise<Specification>{
        const specification = await this.repository.findOne({ name });

        return specification;
    }
    async create({ name, description }: ISpecificationDTO) : Promise<Specification>{
        const specification = this.repository.create({
            name, description
        });

        await this.repository.save(specification);

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }

}

export {SpecificationRepository}