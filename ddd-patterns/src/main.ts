import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer("123", "Pedro Lugon");
const address = new Address("Rua Dois", 2, "12345-678", "Brasília");
customer.Address = address;
// RELAÇÃO DE AGREGADO (MESMO AGREGADO)
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);

const order = new Order("1", "123", [item1, item2]);
// RELAÇÃO DE REFERÊNCIA POR ID(123) (AGREGADOS DIFERENTES)
