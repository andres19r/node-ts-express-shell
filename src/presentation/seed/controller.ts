import { Request, Response } from "express";
import { CategoryModel, ProductModel } from "../../data";
import { CartItemModel } from "../../data/mongo/models/cart-item.model";
import { SeedCategory, SeedProduct } from "../../data/seed/seed";
import { seedData } from "../../data/seed/data";

export class SeedController {
  constructor() {}

  execute = async (req: Request, res: Response) => {
    await Promise.all([
      CategoryModel.deleteMany(),
      ProductModel.deleteMany(),
      CartItemModel.deleteMany(),
    ]);


    const categories = await CategoryModel.insertMany(
      seedData.categories.map((category: SeedCategory) => ({
        name: category.name,
        description: category.description,
      })),
    );

    const categoryMap: { [key: string]: string } = categories.reduce(
      (acc: { [key: string]: string }, category: any) => {
        acc[category.name] = category._id.toString();
        return acc;
      },
      {},
    );

    const products = await ProductModel.insertMany(
      seedData.products.map((product: SeedProduct) => ({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        img: product.img,
        category: categoryMap[product.category],
      })),
    );

    return res.json("Seed Executed");
  };
}
