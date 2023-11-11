import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../../product/product-created.event";

export default class SendConsoleLog2Handler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
