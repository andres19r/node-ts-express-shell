import { Router } from "express";
import { OrderService } from "../services/order.service";
import { OrderController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const orderService = new OrderService();
    const controller = new OrderController(orderService);

    router.get("/", [AuthMiddleware.validateJWT], controller.findAll);
    router.post("/", [AuthMiddleware.validateJWT], controller.create);
    router.get("/:id", [AuthMiddleware.validateJWT], controller.findById);
    router.put("/:id", [AuthMiddleware.validateJWT], controller.update);
    router.delete("/:id", [AuthMiddleware.validateJWT], controller.delete);

    return router;
  }
}
