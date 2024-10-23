import { CartItemModel } from "../../data/mongo/models/cart-item.model";
import { CartModel } from "../../data/mongo/models/cart.model";
import { OrderItemModel } from "../../data/mongo/models/order-item.model";
import { OrderModel } from "../../data/mongo/models/order.model";
import { CustomError, UserEntity } from "../../domain";

export class OrderService {
  constructor() {}

  public async findOrdersByUser(user: UserEntity) {
    const orders = await OrderModel.find({ user: user.id });
    if (!orders)
      throw CustomError.badRequest(`Order not found with userId ${user.id}`);
    const ordersResponse = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItemModel.find({ order });
        return {
          order,
          items: orderItems,
        };
      }),
    );
    return ordersResponse;
  }

  public async createOrder(
    user: UserEntity,
    paymentMethod: string,
    shippingAddress: string,
  ) {
    const cart = await CartModel.findOne({ user: user.id });
    if (!cart)
      throw CustomError.badRequest(`Cart with userId ${user.id} doesn't exist`);
    const cartItems = await CartItemModel.find({ cart: cart.id });
    if (!cartItems.length) throw CustomError.badRequest("The Cart is empty");

    try {
      const order = new OrderModel({
        user: user.id,
        status: "pending",
        paymentMethod,
        shippingAddress,
      });
      let totalPrice = 0;
      const orderItems = cartItems.map((cartItem) => {
        const total = cartItem.quantity * cartItem.price;
        totalPrice += total;
        return {
          order: order.id,
          product: cartItem.product,
          quantity: cartItem.quantity,
          price: cartItem.price,
          total,
        };
      });
      order.totalPrice = totalPrice;
      cart.updatedAt = new Date();
      await CartItemModel.deleteMany({ cart: cart.id });
      await cart.save();
      await OrderItemModel.insertMany(orderItems);
      await order.save();
      return {
        order,
        orderItems,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
