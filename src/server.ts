import { ServerBootstrap } from "@shared/infra/http/ServerBootstrap";

const server = new ServerBootstrap(3333);

server.info();
