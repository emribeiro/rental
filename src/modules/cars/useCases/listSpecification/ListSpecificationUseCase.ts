import { inject, injectable } from "tsyringe";
import { Specification } from "../../model/specification";
import { SpecificationRepository } from "../../repository/implementations/specificationRepository";

@injectable()
class ListSpecificationUseCase{
    
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository : SpecificationRepository){}
    
    async execute() : Promise<Specification[]> {
        const specifications = await this.specificationRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase }