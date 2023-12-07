import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UseCasesProps {
  addClientUsecase: UseCaseInterface;
  findClientUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addClientUsecase: UseCaseInterface;
  private _findClientUsecase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this._addClientUsecase = useCasesProps.addClientUsecase;
    this._findClientUsecase = useCasesProps.findClientUsecase;
  }
  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addClientUsecase.execute(input);
  }
  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findClientUsecase.execute(input);
  }
}
