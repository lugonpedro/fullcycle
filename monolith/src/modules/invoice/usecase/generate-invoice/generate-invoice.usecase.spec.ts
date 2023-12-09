import Id from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import Invoice from "../../domain/entity/invoice.entity";
import { Address } from "../../domain/value-object/address.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const address = new Address({
  street: "Rua 1",
  number: "123",
  complement: "Perto do hospital",
  city: "Brasília",
  state: "DF",
  zip: "123456",
});

const invoiceItem = new InvoiceItem({
  id: new Id("1"),
  price: 100,
  name: "Item 1",
});

const invoice = new Invoice({
  name: "Invoice 1",
  document: "123456",
  address: address,
  items: [invoiceItem],
  createdAt: new Date(),
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Generate invoice use case unit test", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "Invoice 1",
      document: "123456",
      street: "Street 1",
      number: "123",
      city: "City",
      zip: "123456",
      state: "State",
      complement: "Complement",
      items: [{ id: "1", name: "Item 1", price: 100 }],
    };

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.zip).toBe(invoice.address.zip);
    expect(result.city).toBe(invoice.address.city);
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
  });
});
