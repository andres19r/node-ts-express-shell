import { Router } from "express";
import { CartService } from "../services/cart.service";
import { CartController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CartRoutes {
  static get routes(): Router {
    const router = Router();
    const cartService = new CartService();
    const controller = new CartController(cartService);

    router.get("/", [AuthMiddleware.validateJWT], controller.getUserCar);
    router.post("/", [AuthMiddleware.validateJWT], controller.addProductToCar);
    router.put("/", [AuthMiddleware.validateJWT], controller.updateCart);
    router.delete(
      "/:productId",
      [AuthMiddleware.validateJWT],
      controller.deleteProductFromCart,
    );

    return router;
  }
}
