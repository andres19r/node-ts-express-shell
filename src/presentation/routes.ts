import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { ProductRoutes } from "./products/routes";
import { FileUploadRoutes } from "./file-upload/routes";
import { ImageRoutes } from "./images/routes";
import { CartRoutes } from "./cart/routes";
import { OrderRoutes } from "./orders/routes";
import { SeedRoutes } from "./seed/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/upload", FileUploadRoutes.routes);
    router.use("/api/images", ImageRoutes.routes);
    router.use("/api/cart", CartRoutes.routes);
    router.use("/api/orders", OrderRoutes.routes);

    router.use("/api/seed", SeedRoutes.routes);

    return router;
  }
}
