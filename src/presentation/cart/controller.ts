import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { CartService } from "../services/cart.service";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getUserCar = async (req: Request, res: Response) => {
    return res.json('getUserCar');
  };

  addProductToCar = async (req: Request, res: Response) => {
    return res.json('addProductToCar');
  };

  updateCart = async (req: Request, res: Response) => {
    return res.json('updateCart');
  };

  deleteProductFromCart = async (req: Request, res: Response) => {
    return res.json('deleteProductFromCart');
  };
}
