import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // id
    public readonly category: string, // id
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = props;
    if (!name) return ["Missing name"];
    if (!user) return ["Missing user"];
    if (!category) return ["Missing category"];
    if (!Validators.isMongoID(user)) return ["Invalid User ID"];
    if (!Validators.isMongoID(category)) return ["Invalid Category ID"];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category,
      ),
    ];
  }
}
