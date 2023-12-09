import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import Invoice from "../../domain/entity/invoice.entity";
import { Address } from "../../domain/value-object/address.value-object";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoiceOnDb = await InvoiceModel.findOne({ where: { id } });

    if (!invoiceOnDb) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    const address = new Address({
      street: invoiceOnDb.street,
      number: invoiceOnDb.number,
      zip: invoiceOnDb.zip,
      city: invoiceOnDb.city,
      state: invoiceOnDb.state,
      complement: invoiceOnDb.complement,
    });

    return new Invoice({
      id: new Id(invoiceOnDb.id),
      name: invoiceOnDb.name,
      document: invoiceOnDb.document,
      createdAt: invoiceOnDb.createdAt,
      updatedAt: invoiceOnDb.updatedAt,
      address: address,
      items: invoiceOnDb.items.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });
  }

  async generate(invoice: Invoice): Promise<Invoice> {
    const { id, name, document, createdAt, updatedAt, items, address } =
      invoice;

    const { street, number, complement, city, state, zip } = address;

    const generatedInvoice = await InvoiceModel.create({
      id: id.id,
      name: name,
      document: document,
      street: street,
      number: number,
      complement: complement,
      city: city,
      state: state,
      zip: zip,
      items: items.map((item) => ({
        id: new Id(item.id.id),
        name: item.name,
        price: item.price,
      })),
      createdAt: createdAt,
      updatedAt: updatedAt,
    });

    return new Invoice({
      id: new Id(generatedInvoice.id),
      name: generatedInvoice.name,
      document: generatedInvoice.document,
      address: new Address({
        street: generatedInvoice.street,
        number: generatedInvoice.number,
        zip: generatedInvoice.zip,
        city: generatedInvoice.city,
        state: generatedInvoice.state,
        complement: generatedInvoice.complement,
      }),
      items: generatedInvoice.items.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
      createdAt: generatedInvoice.createdAt,
      updatedAt: generatedInvoice.updatedAt,
    });
  }
}
