import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { OrderService } from "../services/order.service";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  findAll = async (req: Request, res: Response) => {
    this.orderService
      .findUserOrders(req.body.user)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };

  findById = async (req: Request, res: Response) => {
    this.orderService
      .findUserOrderById(req.body.user, req.params.id)
      .then((order) => res.json(order))
      .catch((error) => this.handleError(error, res));
  };

  create = async (req: Request, res: Response) => {
    const { user, paymentMethod, shippingAddress } = req.body;
    this.orderService
      .createOrder(user, paymentMethod, shippingAddress)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };

  update = async (req: Request, res: Response) => {
    const { status } = req.body;
    this.orderService
      .modifyOrder(status, req.params.id)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };

  delete = async (req: Request, res: Response) => {
    this.orderService
      .cancelOrder(req.body.user, req.params.id)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };
}
