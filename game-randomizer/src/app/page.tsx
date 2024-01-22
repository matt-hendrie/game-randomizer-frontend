import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ReloadButton from '~/app/_components/ReloadButton';
import GameDisplay  from "~/app/_components/GameDisplay";

export default async function Home() {
    noStore();
    const game = await api.games.getGames.query();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            {!game ? (
                <div className="loading-indicator"></div>
            ) : (
                <>
                    <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
                    <GameDisplay game={game}/>
                    <ReloadButton/>
                </>
            )}
        </div>
    );
}