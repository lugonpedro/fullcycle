import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import StoreCatalogGateway from "../../gateway/store-catalog.gateway";
import { FindAllProductsOutputDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
  constructor(private productRepository: StoreCatalogGateway) {}

  async execute(): Promise<FindAllProductsOutputDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
