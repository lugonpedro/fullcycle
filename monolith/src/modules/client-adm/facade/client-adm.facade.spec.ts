import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/sequelize/client.model";
import ClientRepository from "../repository/sequelize/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const addUsecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addClientUsecase: addUsecase,
      findClientUsecase: undefined,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await facade.add(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });
});
