import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const address = new Address("Street 1", 1, "123456", "City");

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "123456",
  address: address,
  items: [
    {
      id: new Id("1"),
      price: 100,
      name: "Item 1",
    },
  ],
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
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.createdAt).toBe(invoice.createdAt);
  });
});
