import { getAllPlayers } from "../../services/playerService";
import PageContainer from "../../components/PageContainer";
import PlayerList from "../../components/PlayerList";
import ErrorState from "../../components/ErrorState";

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
        <ErrorState message="Failed to fetch players" />
      ) : (
        <PlayerList players={players} />
      )}
    </PageContainer>
  );
}