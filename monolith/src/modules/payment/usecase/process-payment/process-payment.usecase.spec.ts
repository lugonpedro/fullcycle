import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const MockRepositoryApproved = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
  };
};

describe("Process payment usecase unit test", () => {
  it("Should approve a transaction", async () => {
    const paymentRepository = MockRepositoryApproved();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      amount: 100,
      orderId: "1",
    };

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.id).toBe(transaction.id.id);
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe(transaction.orderId);
  });

  it("Should decline a transaction", async () => {
    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      amount: 50,
      orderId: "1",
    };

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.id).toBe(transaction2.id.id);
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe(transaction2.orderId);
  });
});
