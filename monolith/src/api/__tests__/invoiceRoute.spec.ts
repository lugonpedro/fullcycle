import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { invoiceRoute } from "../routes/invoiceRoute";
import InvoiceModel from "../../modules/invoice/repository/sequelize/invoice.model";

describe("API /invoice e2e tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/invoice", invoiceRoute);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find an invoice", async () => {
    const invoiceCreated = await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "123456",
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
        },
      ],
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zip: "123456",
    });

    const response = await request(app).get(`/invoice/${invoiceCreated.id}`);

    expect(response.body.id).toEqual(invoiceCreated.id);
    expect(response.body.name).toEqual(invoiceCreated.name);
    expect(response.body.document).toEqual(invoiceCreated.document);

    expect(response.body.total).toEqual(300);
    expect(response.body.items.length).toEqual(2);

    expect(response.body.address.street).toBe(invoiceCreated.street);
    expect(response.body.address.number).toBe(invoiceCreated.number);
    expect(response.body.address.zip).toBe(invoiceCreated.zip);
    expect(response.body.address.city).toBe(invoiceCreated.city);
    expect(response.body.address.state).toBe(invoiceCreated.state);
    expect(response.body.address.complement).toBe(invoiceCreated.complement);
  });
});
