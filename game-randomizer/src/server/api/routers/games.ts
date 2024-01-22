import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as process from "process";

const gameRatingSchema = z.object({
    apiDetailUrl: z.string(),
    id: z.number(),
    name: z.string()
});

const imageSchema = z.object({
    iconUrl: z.string(),
    mediumUrl: z.string(),
    screenUrl: z.string(),
    smallUrl: z.string(),
    superUrl: z.string(),
    thumbUrl: z.string(),
    tinyUrl: z.string()
});

const platformSchema = z.object({
    id: z.number(),
    aliases: z.null(),
    name: z.string(),
    apiDetailUrl: z.string(),
    siteDetailUrl: z.string(),
    abbreviation: z.string(),
    dateAdded: z.string(),
    dateLastUpdated: z.string(),
    deck: z.null(),
    description: z.null(),
    image: z.null(),
    installBase: z.null(),
    onlineSupport: z.boolean(),
    originalPrice: z.null(),
    releaseDate: z.null()
});

const mainSchema = z.array(
        z.object({
            id: z.number(),
            aliases: z.string(),
            name: z.string(),
            apiDetailUrl: z.string(),
            dateAdded: z.string(),
            dateLastUpdated: z.string(),
            deck: z.string(),
            description: z.string(),
            developers: z.null(),
            expectedReleaseDay: z.null(),
            expectedReleaseMonth: z.null(),
            expectedReleaseQuarter: z.null(),
            expectedReleaseYear: z.number(),
            franchises: z.null(),
            genres: z.null(),
            image: imageSchema,
            images: z.null(),
            numberOfUserReviews: z.number(),
            originalGameRating: z.array(gameRatingSchema),
            originalReleaseDate: z.null(),
            platforms: z.array(platformSchema),
            publishers: z.null(),
            releases: z.null(),
            siteDetailUrl: z.string(),
            similarGames: z.null()
        })
);


export const gamesRouter = createTRPCRouter({
    getGames: protectedProcedure.mutation(async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/game", {
            headers: {
                'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
            }
        });
        const games = mainSchema.parse(await response.json());
        return games;
    }),
});
