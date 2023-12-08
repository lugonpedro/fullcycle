import {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./payment.facade.dto";

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
