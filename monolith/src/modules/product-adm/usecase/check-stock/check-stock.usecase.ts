import ProductAdmGateway from "../../gateway/product-adm.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockProductUseCase {
  private _productRepository: ProductAdmGateway;

  constructor(_productRepository: ProductAdmGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.id);

    if (!product) {
      throw new Error(`Product with id ${input.id} not found`);
    }

    return {
      id: product.id.id,
      stock: product.stock,
    };
  }
}
