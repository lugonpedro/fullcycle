import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/sequelize/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const repository = new ClientRepository();
    const findUsecase = new FindClientUseCase(repository);
    const addUsecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addClientUsecase: addUsecase,
      findClientUsecase: findUsecase,
    });

    return facade;
  }
}
