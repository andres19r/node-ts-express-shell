export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly description?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, description, available = false } = object;
    let availableBoolean = available;

    if (!name) return ["Missing name"];
    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean)];
  }
}
