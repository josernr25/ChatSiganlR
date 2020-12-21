// Se crea la conexion
const connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

// Metodo que recive los msj
connection.on("ReceiveMessage", (name, message) => {
    const fecha = new Date().toLocaleTimeString();
    const messageView = fecha + " - <strong>" + name + " :</strong> " + message;
    const li = document.createElement("li");
    li.innerHTML = messageView;
    document.getElementById("chat").appendChild(li);
});

// Se activa la conexion
connection.start().catch(err => console.error(err.toString()));

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;

    console.log("Entra al evento: " + user + " " + message);

    // Se envia el mensaje al Hub
    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));

    event.preventDefault();
});