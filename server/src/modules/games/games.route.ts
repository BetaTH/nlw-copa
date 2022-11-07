import { FastifyInstance } from "fastify";
import { authenticate } from "../../plugins/authenticate";
import { prisma } from "../../utils/prisma";

import { z } from "zod";

async function gamesRoute(server: FastifyInstance) {
  server.get(
    "/pool-games/:id",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getPoolsParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolsParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: "desc",
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                poolId: id,
              },
            },
          },
        },
      });

      return {
        games: games.map((game) => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined,
          };
        }),
      };
    }
  );
}

export default gamesRoute;
