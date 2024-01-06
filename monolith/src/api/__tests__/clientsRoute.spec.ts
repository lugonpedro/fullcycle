import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientsRoute } from "../routes/clientsRoute";
import ClientModel from "../../modules/client-adm/repository/sequelize/client.model";

describe("API /clients e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/clients", clientsRoute);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      name: "Client 1",
      email: "Client 1 description",
      address: "Quadra 1 Rua 1 Casa 1",
    });

    expect(response.status).toBe(201);
  });
});
