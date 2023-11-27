import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E tests for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 123,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(123);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 123,
    });

    expect(response.status).toBe(201);

    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 456,
    });

    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(123);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(456);
  });

  it("should find a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 123,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(123);

    const response2 = await request(app).get(`/product/${response.body.id}`);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe("Product");
    expect(response2.body.price).toBe(123);
  });

  it("should update a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 123,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(123);

    const response2 = await request(app)
      .put(`/product/${response.body.id}`)
      .send({
        name: "Product Updated",
        price: 456,
      });
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe("Product Updated");
    expect(response2.body.price).toBe(456);
  });
});
