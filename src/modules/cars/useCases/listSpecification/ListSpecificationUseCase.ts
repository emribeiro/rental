import { Specification } from "../../model/specification";
import { SpecificationRepository } from "../../repository/implementations/specificationRepository";

class ListSpecificationUseCase{
    
    constructor(private specificationRepository : SpecificationRepository){}
    
    execute() : Specification[] {
        const specifications = this.specificationRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase }