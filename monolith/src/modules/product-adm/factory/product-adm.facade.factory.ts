import ProductFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/sequelize/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockProductUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockProductUseCase(productRepository);
    const productFacade = new ProductFacade({
      addUsecase: addProductUseCase,
      checkStockUsecase: checkStockUseCase,
    });

    return productFacade;
  }
}
