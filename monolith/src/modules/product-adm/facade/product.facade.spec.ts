import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model";
import ProductFacadeFactory from "../factory/product.facade.factory";

describe("Product facade test", () => {
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

  it("should create a product", async () => {
    const productFacadeFactory = ProductFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    await productFacadeFactory.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });

  it("should check stock of a product", async () => {
    const productFacadeFactory = ProductFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await productFacadeFactory.addProduct(input);

    const result = await productFacadeFactory.checkStock({ id: "1" });

    expect(result.id).toBe(input.id);
    expect(result.stock).toBe(input.stock);
  });
});
