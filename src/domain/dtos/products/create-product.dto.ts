import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly description: string,
    public readonly category: string, // id
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, price, stock, description, category } = props;
    if (!name) return ["Missing name"];
    if (!category) return ["Missing category"];
    if (!Validators.isMongoID(category)) return ["Invalid Category ID"];

    return [
      undefined,
      new CreateProductDto(name, price, stock, description, category),
    ];
  }
}
