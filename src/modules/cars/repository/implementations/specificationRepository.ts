import { Specification } from "../../model/specification";
import {ISpecificationDTO, ISpecificationRepository} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository{
    private specifications;


    constructor(){
        this.specifications = [];
    }
    
    list() {
        return this.specifications;
    }
    findByName(name: string) {
        const specification = this.specifications.find(specification => specification.name === name);

        console.log(specification);

        return specification;
    }
    create({ name, description }: ISpecificationDTO) {
        const specification = new Specification();

        Object.assign(specification, {name, description});

        this.specifications.push(specification);

        return specification;
    }

}

export {SpecificationRepository}