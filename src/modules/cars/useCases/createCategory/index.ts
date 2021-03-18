import { CategoriesRepository } from "../../repository/categoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./createCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);


export {createCategoryController};