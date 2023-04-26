import Koa from "koa";
import routesInstaller from "./routes";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = new Koa();

// socket.io
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // 代表有人连接服务端了
  console.log("Someone connect");
  socket.on("message", (message) => {
    console.log("客户端发新版本", message);
    // 告诉这个版本应用成功没有
    // 版本合并
    socket.emit("message", message);
  });
});

httpServer.listen(3002, () => {
  console.log("WebSocket is running at port 3002");
});

const port: number = 3001;

app.use(bodyParser());

app.use(cors());

routesInstaller(app);

app.listen(port, () => {
  console.log("Application is running at port", port);
});
