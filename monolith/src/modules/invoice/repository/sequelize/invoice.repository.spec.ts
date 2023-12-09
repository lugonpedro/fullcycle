import { Sequelize } from "sequelize-typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";
import { Address } from "../../domain/value-object/address.value-object";
import InvoiceModel from "./invoice.model";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import Invoice from "../../domain/entity/invoice.entity";

describe("Invoice sequelize repository test", () => {
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
      document: "Document 1",
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: new Id("1"),
          name: "Product 1",
          price: 100,
        },
        {
          id: new Id("2"),
          name: "Product 2",
          price: 200,
        },
      ],
      street: "street",
      number: "number",
      complement: "complement",
      city: "city",
      state: "state",
      zip: "zip",
    });

    const invoiceRepository = new InvoiceRepository();

    const result = await invoiceRepository.find("1");

    expect(result.id.id).toEqual(invoiceCreated.id);
    expect(result.name).toEqual(invoiceCreated.name);
    expect(result.document).toEqual(invoiceCreated.document);
    expect(result.items[0].name).toEqual(invoiceCreated.items[0].name);
    expect(result.items[1].name).toEqual(invoiceCreated.items[1].name);
    expect(result.items[1].price).toEqual(invoiceCreated.items[1].price);
    expect(result.items[1].id.id).toEqual(invoiceCreated.items[1].id);
    expect(result.total).toEqual(300);
    expect(result.address).toEqual(
      new Address({
        street: invoiceCreated.street,
        number: invoiceCreated.number,
        complement: invoiceCreated.complement,
        city: invoiceCreated.city,
        state: invoiceCreated.state,
        zip: invoiceCreated.zip,
      })
    );
  });

  it("should generate an invoice", async () => {
    const address = new Address({
      street: "Rua 1",
      number: "123",
      complement: "Perto do hospital",
      city: "Brasília",
      state: "DF",
      zip: "123456",
    });

    const product1 = new InvoiceItem({
      id: new Id("1"),
      name: "Product 1",
      price: 100,
    });

    const product2 = new InvoiceItem({
      id: new Id("2"),
      name: "Product 2",
      price: 200,
    });

    const invoice = new Invoice({
      id: new Id("123"),
      name: "Invoice 1",
      document: "Document 1",
      items: [product1, product2],
      address: address,
    });

    const invoiceRepository = new InvoiceRepository();

    const result = await invoiceRepository.generate(invoice);

    expect(result.id).toEqual(invoice.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
    expect(result.items[1].id.id).toEqual(invoice.items[1].id);
    expect(result.address).toEqual(invoice.address);
    expect(invoice.total).toEqual(300);
    expect(result.total).toEqual(invoice.total);
  });
});
