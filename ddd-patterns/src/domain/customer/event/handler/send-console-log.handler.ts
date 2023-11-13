import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedEvent from "../customer-changed.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerChangedEvent>
{
  handle(event: CustomerChangedEvent): void {
    const data = event.eventData;
    console.log(
      `Endereço do cliente: ${data.id}, ${data.name} alterado para: ${data.address.street}, ${data.address.number}, ${data.address.zip}, ${data.address.city}`
    );
  }
}
