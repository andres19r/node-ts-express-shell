import { CategoryModel, ProductModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExists) throw CustomError.badRequest("Category already exists");

    try {
      const category = new CategoryModel(createCategoryDto);
      // await category.save();
      return {
        id: category.id,
        name: category.name,
        available: category.available,
        description: category.description,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories() {
    try {
      const categories = await CategoryModel.find();
      const categoriesResponse = await Promise.all(
        categories.map(async (category) => {
          const products = await ProductModel.find({ category: category.id });
          return {
            id: category.id,
            name: category.name,
            available: category.available,
            description: category.description,
            products,
          };
        }),
      );
      return categoriesResponse;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
