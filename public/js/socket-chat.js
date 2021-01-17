var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("Debe introducir el nombre y la sala");
}
var usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, function (resp) {
    console.log("Usuarios conectados ", resp);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "Fernando",
//     mensaje: "Hola Mundo",
//   },
//   function (resp) {
//     console.log("respuesta server: ", resp);
//   }
// );

//Escuchar cambios de usuarios , cuando un usuario entra o sale del chat
socket.on("crearMensaje", function (resp) {
  console.log(resp);
});

socket.on("listaPersonas", function (personas) {
  console.log(personas);
});

//Mensajes privados
socket.on("mensajePrivado", function (mensaje) {
  console.log(mensaje);
});
