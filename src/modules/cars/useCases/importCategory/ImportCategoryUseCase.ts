import csvParse from 'csv-parse';
import fs from "fs";
import { inject, injectable } from 'tsyringe';
import { Category } from '../../infra/typeorm/model/category';
import { ICategoriesRepository } from '../../repository/ICategoriesRepository';

interface IImportCategory{
    name: string,
    description: string;
}

@injectable()
class ImportCategoryUseCase{

    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository){}

    private loadDocument(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;

                categories.push({
                    name, description
                });
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        })
    }
    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadDocument(file);

        console.log(categories);
        categories.map(async(category) => {
            const {name, description} = category;

            const foundCategory = await this.categoryRepository.findByName(name);

            if(!foundCategory){
                this.categoryRepository.create({
                    name, description
                });
            }
            
        });
    }
}

export {ImportCategoryUseCase}