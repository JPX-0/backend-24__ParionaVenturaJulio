import productsApi from "../../api/productos.js";

export default async function addProductsHandlers(socket, sockets) {
	const products = await productsApi.getAll();
  socket.emit("products", products);

  socket.on("update", async product => {
    await productsApi.save(product);
		const products = await productsApi.getAll();
    sockets.emit("products", products);
  });
};