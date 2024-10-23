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
    this.cartService
      .getCartByUser(req.body.user)
      .then((cart) => res.json(cart))
      .catch((error) => this.handleError(error, res));
  };

  addProductToCar = async (req: Request, res: Response) => {
    const { user, productId, quantity } = req.body;
    this.cartService
      .addProductToCart(user, productId, quantity)
      .then((cartItem) => res.json(cartItem))
      .catch((error) => this.handleError(error, res));
  };

  updateCart = async (req: Request, res: Response) => {
    const { user, productId, newQuantity } = req.body;
    this.cartService
      .updateCart(user, productId, newQuantity)
      .then((cartItem) => res.json(cartItem))
      .catch((error) => this.handleError(error, res));
  };

  deleteProductFromCart = async (req: Request, res: Response) => {
    this.cartService
      .deleteProductFromCart(req.body.user, req.params.productId)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}
