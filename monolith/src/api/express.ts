import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/productsRoute";
import ProductAdmModel from "../modules/product-adm/repository/sequelize/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/products", productsRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([ProductAdmModel]);

  await sequelize.sync();
}

setupDb();
