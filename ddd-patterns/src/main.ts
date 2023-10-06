import Address from "./entity/address";
import Customer from "./entity/costumer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let costumer = new Customer("123", "Pedro Lugon");
const address = new Address("Rua Dois", 2, "12345-678", "Brasília");
costumer.Address = address;
// RELAÇÃO DE AGREGADO (MESMO AGREGADO)
costumer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);

const order = new Order("1", costumer._id, [item1, item2]);
// RELAÇÃO DE REFERÊNCIA POR ID (AGREGADOS DIFERENTES)
