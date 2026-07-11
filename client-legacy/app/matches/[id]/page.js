import { getMatchById } from "../../../services/matchService";
import MatchDetailView from "../../../components/MatchDetailView";

export const dynamic = "force-dynamic";

export default async function MatchDetailPage({ params }) {
  let match = null;

  try {
    const res = await getMatchById(params.id);
    match = res.data || null;
  } catch (error) {
    match = null;
  }

  return <MatchDetailView match={match} type="match" />;
}