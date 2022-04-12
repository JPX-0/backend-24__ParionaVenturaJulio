import menssagesApi from "../../api/mensajes.js";
import { normalizedMessages } from "../../normalizacion/index.js";

export default async function addMenssagesHandlers(socket, sockets) {
  socket.emit("messages", normalizedMessages(await menssagesApi.getAll()));

  socket.on("newMessage", async message => {
    message.fyh = new Date().toLocaleString();
    await menssagesApi.save(message);
    sockets.emit("messages", normalizedMessages(await menssagesApi.getAll()));
  });
};