import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product", () => {
    let product = ProductFactory.create("Product", 123);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product");
    expect(product.price).toBe(123);
  });
});
