import { Sequelize } from "sequelize-typescript";
import { InvoiceFacadeFactory } from "../factory/facade.factory";
import { Address } from "../domain/value-object/address.value-object";
import InvoiceModel from "../repository/sequelize/invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Invoice facade test", () => {
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
    const invoiceFacade = InvoiceFacadeFactory.create();

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

    const result = await invoiceFacade.find({ id: "1" });

    expect(result.id).toEqual(invoiceCreated.id);
    expect(result.name).toEqual(invoiceCreated.name);
    expect(result.document).toEqual(invoiceCreated.document);

    expect(result.createdAt.toString()).toEqual(
      invoiceCreated.createdAt.toString()
    );

    expect(result.total).toEqual(300);
    expect(result.items.length).toEqual(2);

    expect(result.address.street).toBe(invoiceCreated.street);
    expect(result.address.number).toBe(invoiceCreated.number);
    expect(result.address.zip).toBe(invoiceCreated.zip);
    expect(result.address.city).toBe(invoiceCreated.city);
    expect(result.address.state).toBe(invoiceCreated.state);
    expect(result.address.complement).toBe(invoiceCreated.complement);
  });

  it("should generate an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "123456",
      street: "Street 1",
      number: "123",
      city: "City",
      zip: "123456",
      state: "State",
      complement: "Complement",
      items: [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
      ],
    };

    const invoiceGenerated = await invoiceFacade.generate(input);
    const invoiceOnDB = await InvoiceModel.findOne({
      where: { id: invoiceGenerated.id },
    });

    expect(invoiceGenerated.id).toBeDefined();
    expect(invoiceOnDB.id).toBeDefined();
    expect(invoiceGenerated.name).toBe(input.name);
    expect(invoiceGenerated.document).toEqual(input.document);
    // expect(invoiceGenerated.items[0].id.id).toBe(input.items[0].id);
    expect(invoiceGenerated.items[0].name).toBe(input.items[0].name);
    expect(invoiceGenerated.items[0].price).toBe(input.items[0].price);
    expect(invoiceGenerated.items[1].name).toBe(input.items[1].name);
    expect(invoiceGenerated.items[1].price).toBe(input.items[1].price);
    expect(invoiceGenerated.total).toEqual(300);

    expect(invoiceGenerated.street).toEqual(input.street);
    expect(invoiceGenerated.number).toEqual(input.number);
    expect(invoiceGenerated.complement).toEqual(input.complement);
    expect(invoiceGenerated.city).toEqual(input.city);
    expect(invoiceGenerated.state).toEqual(input.state);
    expect(invoiceGenerated.zip).toEqual(input.zip);
  });
});
