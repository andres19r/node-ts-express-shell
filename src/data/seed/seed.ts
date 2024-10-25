import { envs } from "../../config";
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModel,
} from "../mongo";
import { CartItemModel } from "../mongo/models/cart-item.model";
import { CartModel } from "../mongo/models/cart.model";
import { OrderItemModel } from "../mongo/models/order-item.model";
import { OrderModel } from "../mongo/models/order.model";
import { seedData } from "./data";

export interface SeedCategory {
  name: string;
  description: string;
}

export interface SeedProduct {
  name: string;
  price: number;
  stock: number;
  description: string;
  img: string;
  category: string;
}

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });
  await executeSeed();

  await MongoDatabase.disconnect();
})();

async function executeSeed() {
  // 1. Delete everything
  await Promise.all([
    // UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
    // CartModel.deleteMany(),
    CartItemModel.deleteMany(),
    // OrderModel.deleteMany(),
    // OrderItemModel.deleteMany(),
  ]);

  // 2. Create categories
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

  // 3. Create products
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
  console.log("Database seeded");
}
