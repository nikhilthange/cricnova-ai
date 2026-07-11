import { getAllPlayers } from "../../services/playerService";
import PageContainer from "../../components/PageContainer";
import PlayerList from "../../components/PlayerList";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  let players = [];
  let error = null;

  try {
    const res = await getAllPlayers();
    players = res.data || [];
  } catch (err) {
    error = err.message;
  }

  return (
    <PageContainer title="Players">
      {error ? (
        <p className="rounded-lg bg-red-900/40 p-4 text-red-300">
          Failed to fetch players
        </p>
      ) : (
        <PlayerList players={players} />
      )}
    </PageContainer>
  );
}