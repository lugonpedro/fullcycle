import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const product = new Product("123", "Product", 123);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const usecase = new FindProductUseCase(productRepository);

    const output = {
      id: "123",
      name: "Product",
      price: 123,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});