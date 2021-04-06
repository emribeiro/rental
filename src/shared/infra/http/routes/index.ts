import { Router } from 'express';
import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { specificationRouter } from './specification.routes';
import { userRouter } from './users.routes';

const router = Router();


router.use("/categories", categoriesRouter);
router.use("/specifications", specificationRouter);
router.use("/users", userRouter);
router.use("/cars", carsRouter);
router.use(authenticateRouter)


export {router}