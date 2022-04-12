import { Router } from "express";
import { webAuth } from "../../auth/index.js";

import path from "path";

const productsWebRouter = new Router();

productsWebRouter.get("/home", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/home.ejs"), { nombre: req.session.nombre });
});

productsWebRouter.get("/productos-vista-test", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/productos-vista-test.html"));
});

export default productsWebRouter;