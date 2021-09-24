const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({static: path.join(__dirname, "public")});

const port = process.env.PORT || 5000;

server.use(middlewares);
server.use("/api", router);

server.listen(port, () => console.log(`Server listening on port ${port}`));