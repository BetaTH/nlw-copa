import { FastifyInstance } from "fastify";
import UserContronler from "./users.controller";
import UserServie from "./users.service";

async function usersRoute(server: FastifyInstance) {
  const service = new UserServie();
  const controler = new UserContronler(service);

  server.get("/count", controler.handleUserCount);
}

export default usersRoute;

// server.register(usersRoute, {
//   prefix: "/users",
// });
