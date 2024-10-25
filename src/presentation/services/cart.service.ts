import { ProductModel } from "../../data";
import { CartItemModel } from "../../data/mongo/models/cart-item.model";
import { CartModel } from "../../data/mongo/models/cart.model";
import { CustomError, UserEntity } from "../../domain";

export class CartService {
  constructor() {}

  public async getCartByUser(user: UserEntity) {
    const cart = await CartModel.findOne({ user: user.id });
    if (!cart)
      throw CustomError.badRequest(`Cart with userId ${user.id} not found`);

    const cartItems = await CartItemModel.find({ cart: cart.id });
    return {
      cart,
      cartItems: [...cartItems],
    };
  }

  public async addProductToCart(
    user: UserEntity,
    productId: string,
    quantity: number,
  ) {
    const { cart } = await this.getCartByUser(user);
    const product = await ProductModel.findById(productId);
    if (!product)
      throw CustomError.badRequest(
        `Product with id ${productId} doesn't exist`,
      );

    try {
      cart.updatedAt = new Date();
      const cartItem = new CartItemModel({
        cart: cart.id,
        product: product.id,
        quantity,
        price: product.price,
        addedAt: new Date(),
        img: product.img,
      });
      await cart.save();
      await cartItem.save();
      return cartItem;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateCart(
    user: UserEntity,
    productId: string,
    newQuantity: number,
  ) {
    const { cart } = await this.getCartByUser(user);
    const cartItem = await CartItemModel.findOne({
      product: productId,
      cart: cart.id,
    });
    if (!cartItem)
      throw CustomError.badRequest("CartItem not found - review the request");

    try {
      cart.updatedAt = new Date();
      cartItem.quantity = newQuantity;
      await cart.save();
      await cartItem.save();
      return cartItem;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteProductFromCart(user: UserEntity, productId: string) {
    const { cart } = await this.getCartByUser(user);
    const cartItem = await CartItemModel.findOne({
      cart: cart.id,
      product: productId,
    });
    if (!cartItem)
      throw CustomError.badRequest(
        `CartItem with ProductId ${productId} not found`,
      );

    try {
      await CartItemModel.findByIdAndDelete(cartItem.id);
      return "Product deleted from Cart";
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
