import { CategoryModel } from "../../data";
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
      await category.save();
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

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      // const total = await CategoryModel.countDocuments();
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit);
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      return {
        page,
        limit,
        total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
          description: category.description,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
