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
    
    async execute({name, description}: IRequest){
        console.log("Creating Specification");
        
        if(await this.specificationRepository.findByName(name)){
            throw new Error("Specification Already Exists");
        }


        const specification = await this.specificationRepository.create({name, description});

        return specification
    }
}

export {CreateSpecificationUseCase}