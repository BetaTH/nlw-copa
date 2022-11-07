import { FastifyInstance } from "fastify";
import { prisma } from "../../utils/prisma";
import { z } from "zod";
import { authenticate } from "../../plugins/authenticate";

async function authRoute(server: FastifyInstance) {
  server.get("/me", { onRequest: [authenticate] }, async (request) => {
    await request.jwtVerify();

    return { user: request.user };
  });

  server.post("/user", async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avartarUrl: userInfo.picture,
        },
      });
    }

    const token = server.jwt.sign(
      {
        name: user.name,
        avartarUrl: user.avartarUrl,
      },
      {
        sub: user.id,
        expiresIn: "7 days",
      }
    );

    return { token: token };
  });
}

export default authRoute;
