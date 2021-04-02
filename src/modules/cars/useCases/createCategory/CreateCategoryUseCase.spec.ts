import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoriesInMemory } from "../../repository/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./createCategoryUseCase";


describe("Create Category", () => {

    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoriesInMemory;

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoriesInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory); 
    })

    it("should be able to create a category", async () => {

        const category = {
            name: "Test category name",
            description: "Test caregory description"
        };

        const createdCategory = await createCategoryUseCase.execute({name: category.name, description: category.description});

        expect(createdCategory).toHaveProperty("id");
    });


    it("should not be able to create a category with name exists", async () => {


        expect(async () => {
            const category = {
                name: "Test category name",
                description: "Test caregory description"
            };
    
            const createdCategory = await createCategoryUseCase.execute({name: category.name, description: category.description});
    
            const createdCategory2 = await createCategoryUseCase.execute({name: category.name, description: category.description});
    
            expect(createdCategory).toHaveProperty("id");
        }).rejects.toBeInstanceOf(AppError);

    });
    
});