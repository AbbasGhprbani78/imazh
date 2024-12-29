

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("fetchData", ({ setting }) => {
      console.log("Setting received from client:", setting);

     
      const simulatedData = ["AG2", "AG4", "AF1", "AG6", "AF1", "AG8", "AG9"];
      let counter = 0;

      const intervalId = setInterval(() => {
        if (counter >= simulatedData.length) {
          clearInterval(intervalId);
          return;
        }
        console.log(`Sending data: ${simulatedData[counter]}`);
        socket.emit("serverData", simulatedData[counter]);
        counter++;
      }, 1000);
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});




// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");
// const { Server } = require("socket.io");
// const net = require("net");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = new Server(server);

//   io.on("connection", (socket) => {
//     console.log("A client connected");

//     let client = null; 
//     let receivedData = "";

//     socket.on("fetchData", ({ setting }) => {
//       if (!setting) {
//         console.log("No setting provided, aborting execution.");
//         socket.emit("serverData", { error: "Setting is required." });
//         return;
//       }
   
//       if (client) {
//         console.log("Disconnecting previous TCP connection.");
//         client.destroy(); 
//         receivedData = ""; 
//       }

//       const host = "192.168.4.1";
//       const port = 8888;
//       client = new net.Socket(); 

//       client.connect(port, host, () => {
//         console.log(`Connected to ${host}:${port}`);
//         const command = setting || "#MKE01$A11*";
//         console.log("Sending command to TCP server:", command);
//         client.write(command);
//       });

//       client.on("data", (data) => {
//         const chunk = data.toString();
//         receivedData += chunk;
//         console.log(`Received chunk: ${chunk}`);
//         socket.emit("serverData", chunk); 
//       });

//       client.on("close", () => {
//         console.log("Connection closed");
//         if (receivedData) {
//           socket.emit("serverData", {
//             message: "Complete data",
//             data: receivedData,
//           });
//         }
//       });

//       client.on("error", (err) => {
//         console.error(`Error: ${err.message}`);
//         socket.emit("serverData", { error: `Socket error: ${err.message}` });
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log("A client disconnected");
//       if (client) {
//         client.destroy(); 
//       }
//     });
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });
