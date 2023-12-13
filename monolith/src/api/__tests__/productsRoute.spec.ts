import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "../routes/productsRoute";
import ProductAdmModel from "../../modules/product-adm/repository/sequelize/product.model";
import ProductStoreModel from "../../modules/store-catalog/repository/sequelize/product.model";

describe("API /products e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/products", productsRoute);

  let sequelize: Sequelize;

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductAdmModel, ProductStoreModel]);
    migration = migrator(sequelize);
    await migration.up();
  });

  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 77,
      stock: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product 1 description");
    expect(response.body.purchasePrice).toBe(77);
    expect(response.body.stock).toBe(10);
  });
});
