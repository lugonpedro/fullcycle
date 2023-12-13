import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import { app, sequelize } from "../express";

describe("API e2e tests", () => {
  let migration: Umzug<any>;

  beforeEach(async () => {
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
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 77,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product 1 description");
    expect(response.body.purchasePrice).toBe(77);
    expect(response.body.stock).toBe(0);
  });
});
