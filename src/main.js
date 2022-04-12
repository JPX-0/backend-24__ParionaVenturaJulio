import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import config from "./config.js";

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import productsApiRouter from "./routers/api/productos-test.js";

import addProductsHandlers from "./routers/ws/productos.js";
import addMenssagesHandlers from "./routers/ws/mensajes.js";

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// configuro el socket
io.on("connection", async socket => {
	addProductsHandlers(socket, io.sockets);
	addMenssagesHandlers(socket, io.sockets);
});

//--------------------------------------------
// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(session({
	// store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
	store: MongoStore.create({ 
		mongoUrl: config.mongoRemote.cnxStr, 
		mongoOptions: { 
			useNewUrlParser: true, 
			useUnifiedTopology: true 
		} 
	}),
	secret: "shhhhhhhhhhhhhhhhhhhhh",
	resave: false,
	saveUninitialized: false,
	rolling: true,
	cookie: { maxAge: 600000 }
}));

//--------------------------------------------
// rutas del servidor API REST
app.use(productsApiRouter);

//--------------------------------------------
// rutas del servidor web
app.use(authWebRouter);
app.use(homeWebRouter);

//--------------------------------------------
// inicio el servidor
const connectedServer = httpServer.listen(config.PORT, () => console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`));
connectedServer.on("error", (error) => console.log(`Error en servidor `, error));
