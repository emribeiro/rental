import { inject, injectable } from "tsyringe";
import { Specification } from "../../model/specification";
import { SpecificationRepository } from "../../repository/implementations/specificationRepository";

@injectable()
class ListSpecificationUseCase{
    
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository : SpecificationRepository){}
    
    execute() : Specification[] {
        const specifications = this.specificationRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase }