import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { checkoutRoute } from "../routes/checkoutRoute";
import OrderModel from "../../modules/checkout/repository/sequelize/order.model";
import ClientModel from "../../modules/client-adm/repository/sequelize/client.model";
import ProductModel from "../../modules/checkout/repository/sequelize/product.model";
import ProductAdmModel from "../../modules/product-adm/repository/sequelize/product.model";
import ProductStoreModel from "../../modules/store-catalog/repository/sequelize/product.model";
import TransactionModel from "../../modules/payment/repository/sequelize/transaction.model";
import InvoiceModel from "../../modules/invoice/repository/sequelize/invoice.model";

describe("API /checkout e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/checkout", checkoutRoute);

  let sequelize: Sequelize;

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([
      OrderModel,
      ClientModel,
      ProductModel,
      ProductAdmModel,
      ProductStoreModel,
      TransactionModel,
      InvoiceModel,
    ]);
    migration = migrator(sequelize);
    await migration.up();
    // await sequelize.sync();
  });

  afterEach(async () => {
    if (!migration || !sequelize) {
      return;
    }
    migration = migrator(sequelize);
    await migration.down();
    // await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "Client 1 description",
      address: "Quadra 1 Rua 1 Casa 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      salesPrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      purchasePrice: 200,
      salesPrice: 200,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // await ProductStoreModel.create({
    //   id: "1",
    //   name: "Product 1",
    //   description: "Description 1",
    //   salesPrice: 100,
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
    expect(response.body.total).toEqual(300);
    expect(response.body.status).toEqual("approved");
  });
});
