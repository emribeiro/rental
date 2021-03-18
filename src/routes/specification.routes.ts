import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationRouter = Router();


specificationRouter.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationRouter.get("/", (request, response)=>{
   // const specifications = specificationRepository.list();

   // return response.status(200).send(specifications);
});


export {specificationRouter};