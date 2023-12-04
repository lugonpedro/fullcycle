import {
  AddProductFacadeInputDto,
  CheckProductFacadeInputDto,
  CheckProductFacadeOutputDto,
} from "./product-adm.facade.dto";

export default interface ProductFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>;

  checkStock(
    input: CheckProductFacadeInputDto
  ): Promise<CheckProductFacadeOutputDto>;
}
