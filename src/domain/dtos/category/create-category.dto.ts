export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly description?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description } = object;

    if (!name) return ["Missing name"];

    return [undefined, new CreateCategoryDto(name, description)];
  }
}
