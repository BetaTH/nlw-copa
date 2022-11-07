import { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticate } from "../../plugins/authenticate";
import { prisma } from "../../utils/prisma";

async function guessesRoute(server: FastifyInstance) {
  server.get("/count", async () => {
    const count = await prisma.guess.count();
    return { count };
  });

  server.post(
    "/pool/:poolId/game/:gameId",
    {
      onRequest: [authenticate],
    },
    async (request, replay) => {
      const createGuessParams = z.object({
        poolId: z.string(),
        gameId: z.string(),
      });
      const createGuessBody = z.object({
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number(),
      });

      const { poolId, gameId } = createGuessParams.parse(request.params);
      const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(
        request.body
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub,
          },
        },
      });

      if (!participant) {
        return replay.status(400).send({
          message: "You're not allowed to create a guess inside this pool.",
        });
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId,
          },
        },
      });

      if (guess) {
        return replay.status(400).send({
          message: "You already sent a guess to this game on this pool.",
        });
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        return replay.status(400).send({
          message: "Game not Found",
        });
      }

      if (game.date < new Date()) {
        return replay.status(400).send({
          message: "You cannot send guess after the game date",
        });
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamPoints,
          secondTeamPoints,
        },
      });

      return replay.status(201).send();
    }
  );
}

export default guessesRoute;
