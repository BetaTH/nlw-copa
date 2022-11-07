import { FastifyInstance } from "fastify";
import UserContronler from "./users.controller";
import UserService from "./users.service";

async function usersRoute(server: FastifyInstance) {
  const service = new UserService();
  const controler = new UserContronler(service);

  server.get("/count", (request, reply) =>
    controler.handleUserCount(request, reply)
  );
}

export default usersRoute;

// server.register(usersRoute, {
//   prefix: "/users",
// });
