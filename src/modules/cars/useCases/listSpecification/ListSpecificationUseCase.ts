import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/model/specification";
import { SpecificationRepository } from "../../infra/typeorm/repositories/specificationRepository";

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