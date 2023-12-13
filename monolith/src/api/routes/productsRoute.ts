import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/product-adm.facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.dto";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create();

  try {
    const input: AddProductFacadeInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock ?? 0,
    };

    const output = await facade.addProduct(input);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
