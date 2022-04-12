import { Router } from "express";

import path from "path";

const authWebRouter = new Router();

authWebRouter.get("/", (req, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
  const nameUser = req.session?.nombre;
  if(nameUser) res.redirect("/");
  else res.sendFile(path.join(process.cwd(), "/views/login.html"));
});

authWebRouter.get("/logout", (req, res) => {
  const nameUser = req.session?.nombre;
  if(nameUser) {
    res.clearCookie('my-session');
    req.session.destroy(err => {
      if(err) res.clearCookie('my-session');
      res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), { nombre: nameUser });
    });
  } else res.redirect("/");
});

authWebRouter.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
});

export default authWebRouter;
