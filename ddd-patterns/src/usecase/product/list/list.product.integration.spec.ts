import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration tests list products use case", () => {
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

  it("should list products", async () => {
    const product1 = new Product("123", "Product 1", 123);
    const product2 = new Product("456", "Product 2", 456);

    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);

    const output = {
      products: [
        { id: product1.id, name: product1.name, price: product1.price },
        { id: product2.id, name: product2.name, price: product2.price },
      ],
    };

    const result = await usecase.execute({});

    expect(result).toEqual(output);
  });
});
