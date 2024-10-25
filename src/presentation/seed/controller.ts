import { Request, Response } from "express";
import { executeSeed } from "../../data/seed/seed";
import { MongoDatabase } from "../../data";
import { envs } from "../../config";

export class SeedController {
  constructor() {}

  execute = async (req: Request, res: Response) => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
    await executeSeed();

    await MongoDatabase.disconnect();

    return res.json("Seed Executed");
  };
}
