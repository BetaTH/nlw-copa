import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import usersRoute from "./modules/users/users.route";
import poolsRoute from "./modules/pools/pools.route";
import guessesRoute from "./modules/guesses/guesses.route";
import gamesRoute from "./modules/games/games.route";
import authRoute from "./modules/auth/auth.route";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  // Em produção precisar ser uma variavel de ambiente
  await fastify.register(jwt, {
    secret: "nlwcopathielson",
  });

  await fastify.register(usersRoute, {
    prefix: "/user",
  });
  await fastify.register(poolsRoute, {
    prefix: "/pool",
  });
  await fastify.register(guessesRoute, {
    prefix: "/guess",
  });
  await fastify.register(gamesRoute, {
    prefix: "/game",
  });
  await fastify.register(authRoute, {
    prefix: "/auth",
  });

  await fastify.listen({ port: 4000, host: "0.0.0.0" });
}

bootstrap();
