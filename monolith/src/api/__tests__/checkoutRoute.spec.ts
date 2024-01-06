import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ClientModel from "../../modules/client-adm/repository/sequelize/client.model";
import ProductModel from "../../modules/product-adm/repository/sequelize/product.model";
import { checkoutRoute } from "../routes/checkoutRoute";
import OrderModel from "../../modules/checkout/repository/sequelize/order.model";

describe("API /checkout e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/checkout", checkoutRoute);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([OrderModel, ProductModel, ClientModel]);
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should do the checkout", async () => {
    // await ClientModel.create({
    //   id: "1",
    //   name: "Client 1",
    //   email: "client@example.com",
    //   address: "Address 1",
    //   document: "0000",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    // await ProductModel.create({
    //   id: "1",
    //   name: "Product 1",
    //   description: "Product description",
    //   purchasePrice: 100,
    //   salesPrice: 100,
    //   stock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    // await ProductModel.create({
    //   id: "2",
    //   name: "Product 2",
    //   description: "Product description",
    //   purchasePrice: 25,
    //   salesPrice: 25,
    //   stock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(125);
    expect(response.body.status).toEqual("approved");
  });
});
