import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Between, In, Repository} from "typeorm";
import {CategoryCreateDto} from "./dto/category-create.dto";
import {Category} from "./category.entity";
import {CategoryUpdateDto} from "./dto/category-update.dto";
import {CategoryDeleteDto} from "./dto/category-delete.dto";
import {CategoryStatsDto} from "./dto/category-stats.dto";
import {CategoryStatsReturnDto} from "./dto/category-stats-return.dto";


@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    async createCategory(dto: CategoryCreateDto) {
        const category = await this.categoryRepository.create(dto);
        return await this.categoryRepository.save(category);
    }

    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getOneById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });
        return await this.checkCategoryIfPresent(category);
    }

    async getOneByName(name: string): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ name });
        return await this.checkCategoryIfPresent(category);
    }

    async updateCategory(dto: CategoryUpdateDto) {
        const id = dto.id
        const category = await this.categoryRepository.findOneBy({ id });
        if(category) {
            category.name = dto.name;
            category.amount = dto.amount;
            return await this.categoryRepository.save(category);
        }
        throw new HttpException(`Category with id = ${dto.id} not founded`, HttpStatus.NOT_FOUND);
    }

    async deleteCategory(dto: CategoryDeleteDto) {
        const name = dto.value;
        const user = await this.categoryRepository.findOneBy({name})
        return await this.categoryRepository.remove(user);
    }

    private async checkCategoryIfPresent(category: Category) {
        if(category)
            return category;
        else
            throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }


    async getStats(dto: CategoryStatsDto): Promise<CategoryStatsReturnDto[]> {
        const categories = await this.categoryRepository.find({
            where: {
                id: In(dto.categoriesIds),
                updatedAt: Between(
                    dto.fromPeriod,
                    dto.toPeriod
                ),
            }
        });
        const resultArray = [];
        for(let i = 0; i < categories.length; i++) {
            resultArray.push(new CategoryStatsReturnDto(categories[i].name, categories[i].amount));
        }
        return resultArray;
    }
}
