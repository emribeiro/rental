import { getRepository, Repository } from "typeorm";
import { Specification } from "../../infra/typeorm/model/specification";
import {ISpecificationDTO, ISpecificationRepository} from "../ISpecificationRepository";

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

}

export {SpecificationRepository}