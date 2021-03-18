import { Router } from "express";
import {SpecificationRepository} from "../modules/cars/repository/implementations/specificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/createSpecificationService";

const specificationRouter = Router();
const specificationRepository = new SpecificationRepository();


specificationRouter.post("/", (request, response) => {
    const {name, description} = request.body;

    const createSpecificationService = new CreateSpecificationService(specificationRepository);
    const specification = createSpecificationService.execute({name, description});

    return response.status(201).send(specification);
});

specificationRouter.get("/", (request, response)=>{
    const specifications = specificationRepository.list();

    return response.status(200).send(specifications);
});


export {specificationRouter};