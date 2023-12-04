import Product from "../domain/product.entity";

export default interface StoreCatalogGateway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}
