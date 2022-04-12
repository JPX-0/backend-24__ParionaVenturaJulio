const socket = io.connect();

//------------------------------------------------------------------------------------

const formProduct = document.getElementById("formProduct");
formProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: formProduct[0].value,
    price: formProduct[1].value,
    thumbnail: formProduct[2].value,
  };
  socket.emit("update", product);
  formProduct.reset();
});

socket.on("products", products => {
  makeHtmlTable(products).then(html => document.getElementById("products").innerHTML = html);
});

function makeHtmlTable(products) {
  return fetch("plantillas/tabla-productos.hbs")
    .then(res => res.text())
    .then(res => {
			const template = Handlebars.compile(res);
      const html = template({ products, productsLength: products.length });
      return html;
    });
}

//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity("author", {}, { idAttribute: "id" });

// Definimos un esquema de mensaje
const schemaMessage = new normalizr.schema.Entity("post", { author: schemaAuthor }, { idAttribute: "_id" });

// Definimos un esquema de posts
const schemaMessages = new normalizr.schema.Entity("posts", { mensajes: [schemaMessage] }, { idAttribute: "id" });
/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById("username");
const inputMessage = document.getElementById("inputMessage");
const inputSubmit = document.getElementById("inputSubmit");

const formMessage = document.getElementById("formPublicarMensaje");
formMessage.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = {
    author: {
      email: inputUsername.value,
      nombre: document.getElementById("firstname").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: inputMessage.value,
  };

  socket.emit("newMessage", message);
  formMessage.reset();
  inputMessage.focus();
});

socket.on("messages", messagesN => {
  const messagesNsize = JSON.stringify(messagesN).length;

  const messagesD = normalizr.denormalize(
    messagesN.result,
    schemaMessages,
    messagesN.entities
  );

  const messagesDsize = JSON.stringify(messagesD).length;
  const percentageC = parseInt((messagesNsize * 100) / messagesDsize);
  document.getElementById("compression-info").innerText = percentageC;

  const html = makeHtmlList(messagesD.mensajes);
  document.getElementById("messages").innerHTML = html;
});

function makeHtmlList(messages) {
  return messages.map(message => {
		return `
			<div>
				<b style="color:blue;">${message.author.email}</b>
				[<span style="color:brown;">${message.fyh}</span>] :
				<i style="color:green;">${message.text}</i>
				<img width="50" src="${message.author.avatar}" alt="avatar">
			</div>
		`;
	}).join(" ");
}

inputUsername.addEventListener("input", () => {
  const valueEmail = inputUsername.value.length;
  const valueMessage = inputMessage.value.length;
  inputMessage.disabled = !valueEmail;
  inputSubmit.disabled = !valueEmail || !valueMessage;
});

inputMessage.addEventListener("input", () => {
  const valueMessage = inputMessage.value.length;
  inputSubmit.disabled = !valueMessage;
});
