import Id from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import Invoice from "../../domain/entity/invoice.entity";
import { Address } from "../../domain/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
  id: new Id("1"),
  name: "Invoice 1",
  document: "123456",
  address: address,
  items: [product1, product2],
  createdAt: new Date(),
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  };
};

describe("Find invoice use case unit test", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(input.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.zip).toBe(invoice.address.zip);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id.id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.createdAt).toBe(invoice.createdAt);
  });
});
