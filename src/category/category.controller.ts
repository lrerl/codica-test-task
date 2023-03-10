import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CategoryService} from "./category.service";
import {Category} from "./category.entity";
import {CategoryCreateDto} from "./dto/category-create.dto";
import {CategoryUpdateDto} from "./dto/category-update.dto";
import {CategoryDeleteDto} from "./dto/category-delete.dto";
import {CategoryStatsDto} from "./dto/category-stats.dto";

@ApiTags('Category controller')
@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @ApiOperation({summary: "Get all categories"})
    @ApiResponse({status: 200, type: Category})
    @Get()
    getAllCategories() {
        return this.categoryService.getAll();
    }

    @ApiOperation({summary: "Get one category by ID"})
    @ApiResponse({status: 200, type: Category})
    @Get(`id/:id`)
    getOneCategoryById(@Param('id') id: number) {
        return this.categoryService.getOneById(id);
    }

    @ApiOperation({summary: "Get one category by name"})
    @ApiResponse({status: 200, type: Category})
    @Get('name/:name')
    getOneCategoryByName(@Param('name') name: string) {
        return this.categoryService.getOneByName(name);
    }

    @ApiOperation({summary: "Create a new category"})
    @ApiResponse({status: 200, type: Category})
    @Post()
    createCategory(@Body() dto: CategoryCreateDto) {
        return this.categoryService.createCategory(dto);
    }

    @ApiOperation({summary: "Update name for category"})
    @ApiResponse({status: 200, type: Category})
    @Put()
    updateCategory(@Body() dto: CategoryUpdateDto) {
        return this.categoryService.updateCategory(dto);
    }

    @ApiOperation({summary: 'Delete category'})
    @ApiResponse({status: 200})
    @Delete()
    deleteCategory(@Body() dto: CategoryDeleteDto) {
        return this.categoryService.deleteCategory(dto);
    }

    @ApiOperation({summary: 'All changes in certain categories in the specified period of time'})
    @ApiResponse({status: 200, type: Category})
    @Get('/stats')
    async getStats(@Body() dto: CategoryStatsDto) {
        return this.categoryService.getStats(dto);
    }
}
