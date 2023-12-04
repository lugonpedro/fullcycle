import Product from "../domain/product.entity";

export default interface ProductAdmGateway {
  add(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
