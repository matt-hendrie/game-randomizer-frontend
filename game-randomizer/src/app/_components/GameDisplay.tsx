import {z} from "zod";
import DOMPurify from "isomorphic-dompurify";

const imageSchema = z.object({
    iconUrl: z.string(),
    mediumUrl: z.string(),
    screenUrl: z.string(),
    smallUrl: z.string(),
    superUrl: z.string(),
    thumbUrl: z.string(),
    tinyUrl: z.string()
});

const gameSchema =
    z.object({
        id: z.union([z.null(), z.number()]),
        aliases: z.union([z.null(), z.string()]),
        name: z.union([z.null(), z.string()]),
        description: z.union([z.null(), z.string()]),
        image: z.union([z.null(), imageSchema]),
    });

export default function GameDisplay({ game }: { game: z.infer<typeof gameSchema> }) {
    const sanitizedHTML = DOMPurify.sanitize(game.description ?? '');

    return (
        <div className="flex mb-4">
            <img src={game.image?.smallUrl} className="rounded-lg shadow-lg w-48 h-48 object-cover" />
            <div className="ml-4">
                <h2 className="text-2xl font-semibold mt-2">{game.name}</h2>
                <div className="text-gray-400 mt-2 max-w-md" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
            </div>
        </div>
    );
}