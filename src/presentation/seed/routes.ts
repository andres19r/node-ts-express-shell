import { Router } from "express";
import { SeedController } from "./controller";

export class SeedRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new SeedController();

    router.get("/", controller.execute);

    return router;
  }
}
