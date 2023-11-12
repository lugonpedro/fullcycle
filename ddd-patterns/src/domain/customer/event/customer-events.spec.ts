import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangedEvent from "./customer-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/send-console-log-1.handler copy";
import SendConsoleLog2Handler from "./handler/send-console-log-2.handler";
import SendConsoleLogHandler from "./handler/send-console-log.handler";

describe("Customer event tests", () => {
  it("should notify all event handlers then console log two CustomerCreated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Pedro Lugon",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify all event handlers then console log customer data", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerChangedEvent({
      id: "123",
      name: "Pedro Lugon",
      address: {
        street: "Rua 1",
        number: "1000",
        zip: "70000-500",
        city: "Brasília",
      },
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
