import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../../../product/event/product-created.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    const data = event.eventData;
    console.log(
      `Endereço do cliente: ${data.id}, ${data.name} alterado para: ${data.address.street}, ${data.address.number}, ${data.address.zip}, ${data.address.city}`
    );
  }
}
