import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.zip,
      input.city
    );

    const invoice = new Invoice({
      name: input.name,
      document: input.name,
      address: address,
      items: input.items.map((item) => ({
        id: new Id(item.id),
        price: item.price,
        name: item.name,
      })),
      createdAt: new Date(),
    });

    const result = await this.invoiceRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: result.name,
      document: result.document,
      street: result.address.street,
      number: result.address.number,
      city: result.address.city,
      zip: result.address.zip,
      items: result.items.map((item) => ({
        id: item.id.id,
        price: item.price,
        name: item.name,
      })),
      total: result.total,
    };
  }
}
