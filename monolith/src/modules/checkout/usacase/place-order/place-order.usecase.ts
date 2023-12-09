import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  constructor() {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    // buscar o cliente

    // validar produtos

    // recuperar os produtos

    // criar o objeto do client

    // criar o objeto da order (client, products)

    // processar o pagamento -> paymentfacade.process

    // caso o pagamento seja aprovado -> gerar invoice
    // mudar o status da minha order para aprovado

    // retornar dto
    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }
}
