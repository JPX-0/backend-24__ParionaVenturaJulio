import { Router } from "express";
import { createNFakeProducts } from "../../mocks/productos.js";

const productsApiRouter = new Router();

productsApiRouter.get("/api/productos-test", (req, res) => {
  res.json(createNFakeProducts(5));
});

export default productsApiRouter;
