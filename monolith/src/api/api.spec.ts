import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { addProductRoute } from "./api";
import ProductModel from "../modules/product-adm/repository/sequelize/product.model";
import { migrator } from "../test-migrations/config/migrator";

describe("Products tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/products", addProductRoute);

  let sequelize: Sequelize;

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductModel]);
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

  it("should create product", async () => {
    const response = await request(app).post("/products").send({
      id: "2",
      name: "DDD",
      description: "Domain Driven Design",
      purchasePrice: 59.9,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("DDD");
    expect(response.body.description).toBe("Domain Driven Design");
    expect(response.body.purchasePrice).toBe(59.9);
  });
});
