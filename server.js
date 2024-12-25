const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const net = require("net");

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

    socket.on("fetchData", () => {
      const host = "192.168.4.1";
      const port = 8888;
      const client = new net.Socket();
      let receivedData = ""; 

  
      client.connect(port, host, () => {
        console.log(`Connected to ${host}:${port}`);
        client.write("#MKE01$A11*"); 
      });

    
      client.on("data", (data) => {
        const chunk = data.toString();
        receivedData += chunk; 
        console.log(`Received chunk: ${chunk}`);
        socket.emit("serverData", chunk);
      });

    
      client.on("close", () => {
        console.log("Connection closed");
     
        if (receivedData) {
          socket.emit("serverData", {
            message: "Complete data",
            data: receivedData,
          });
        }
      });

      client.on("error", (err) => {
        console.error(`Error: ${err.message}`);
        socket.emit("serverData", { error: `Socket error: ${err.message}` });
      });
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
