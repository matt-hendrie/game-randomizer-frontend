import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as process from "process";

const imageSchema = z.object({
    iconUrl: z.string(),
    mediumUrl: z.string(),
    screenUrl: z.string(),
    smallUrl: z.string(),
    superUrl: z.string(),
    thumbUrl: z.string(),
    tinyUrl: z.string()
});

const mainSchema = z.array(
    z.object({
        id: z.union([z.null(), z.number()]),
        aliases: z.union([z.null(), z.string()]),
        name: z.union([z.null(), z.string()]),
        description: z.union([z.null(), z.string()]),
        image: z.union([z.null(), imageSchema]),
    })
);


export const gamesRouter = createTRPCRouter({
    getGames: publicProcedure.query(async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/game", {
            headers: {
                'x-api-key': `${process.env.BACKEND_API_KEY}`
            }
        });
        const games = mainSchema.parse(await response.json());
        return games;
    }),
});
