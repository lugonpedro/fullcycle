import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/sequelize/transaction.model";
import PaymentFacade from "./payment.facade";
import TransactionRepository from "../repository/sequelize/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await facade.process(input);

    expect(result.id).toBeDefined();
    expect(result.orderId).toBe(input.orderId);
    expect(result.amount).toBe(input.amount);
    expect(result.status).toBe("approved");
  });
});
