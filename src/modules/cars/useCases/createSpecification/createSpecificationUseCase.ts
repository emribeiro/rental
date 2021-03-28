import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repository/ISpecificationRepository";

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase{
    
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository : ISpecificationRepository){}
    
    execute({name, description}: IRequest){
        if(this.specificationRepository.findByName(name)){
            throw new Error("Specification Already Exists");
        }

        const specification = this.specificationRepository.create({name, description});

        return specification
    }
}

export {CreateSpecificationUseCase}