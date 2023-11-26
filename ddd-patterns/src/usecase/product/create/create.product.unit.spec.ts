import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product",
  price: 123,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const customerRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(customerRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(customerRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is lower than zero", async () => {
    const customerRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(customerRepository);

    input.name = "Product";
    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
