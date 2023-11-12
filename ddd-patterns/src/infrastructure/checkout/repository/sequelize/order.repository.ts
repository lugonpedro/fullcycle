import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const updatedItems = entity.items.map(
      (orderItemModel) =>
        new OrderItem(
          orderItemModel.id,
          orderItemModel.name,
          orderItemModel.price,
          orderItemModel.productId,
          orderItemModel.quantity
        )
    );

    const itemsOnDB = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    });

    for (const updatedItem of updatedItems) {
      const itemExistsOnDB = itemsOnDB.find(
        (itemOnDB) => itemOnDB.id === updatedItem.id
      );

      if (!itemExistsOnDB) {
        await OrderItemModel.create({
          id: updatedItem.id,
          product_id: updatedItem.productId,
          order_id: entity.id,
          quantity: updatedItem.quantity,
          name: updatedItem.name,
          price: updatedItem.price,
        });
      }
    }

    await OrderModel.update(
      { total: entity.total() },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order(
      id,
      orderModel.customer_id,
      orderModel.items.map(
        (orderItemModel) =>
          new OrderItem(
            orderItemModel.id,
            orderItemModel.name,
            orderItemModel.price,
            orderItemModel.product_id,
            orderItemModel.quantity
          )
      )
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = orderModels.map((orderModel) => {
      let order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );

      return order;
    });

    return orders;
  }
}
