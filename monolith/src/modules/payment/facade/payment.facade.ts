import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./payment.facade.dto";
import PaymentFacadeInterface from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}

  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}
