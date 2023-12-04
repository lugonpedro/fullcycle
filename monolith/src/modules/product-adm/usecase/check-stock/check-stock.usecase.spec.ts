import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockProductUseCase from "./check-stock.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product",
  description: "Product description",
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("Check stock usecase unit test", () => {
  it("should get stock of a product", async () => {
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockProductUseCase(productRepository);
    const input = {
      id: "1",
    };

    const result = await checkStockUseCase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.id).toBe("1");
    expect(result.stock).toBe(10);
  });
});