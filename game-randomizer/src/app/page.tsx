import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
    noStore();
    const gamesData = await api.games.getGames.query();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1 className="text-4xl font-bold mb-4">Games</h1>
            {gamesData.map((game) => (
                <div key={game.id} className="mb-4">
                    <img src={game.image?.smallUrl} className="rounded-lg shadow-lg" />
                    <h2 className="text-2xl font-semibold mt-2">{game.name}</h2>
                </div>
            ))}
        </div>
    );
}
