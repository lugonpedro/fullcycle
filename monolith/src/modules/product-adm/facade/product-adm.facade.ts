import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  AddProductFacadeInputDto,
  CheckProductFacadeInputDto,
  CheckProductFacadeOutputDto,
} from "./product-adm.facade.dto";
import ProductFacadeInterface from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUsecase: UseCaseInterface;
  checkStockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this._addUsecase = useCasesProps.addUsecase;
    this._checkStockUsecase = useCasesProps.checkStockUsecase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }
  checkStock(
    input: CheckProductFacadeInputDto
  ): Promise<CheckProductFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}
