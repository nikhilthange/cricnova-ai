export function getTopRunScorer(players = []) {
  let topPlayer = null;
  let maxRuns = -1;

  for (const player of players) {
    const totalRuns =
      player.playerStats?.reduce((sum, stat) => sum + (stat.runs || 0), 0) || 0;

    if (totalRuns > maxRuns) {
      maxRuns = totalRuns;
      topPlayer = { ...player, totalRuns };
    }
  }

  return topPlayer;
}

export function getTopWicketTaker(players = []) {
  let topPlayer = null;
  let maxWickets = -1;

  for (const player of players) {
    const totalWickets =
      player.playerStats?.reduce((sum, stat) => sum + (stat.wickets || 0), 0) || 0;

    if (totalWickets > maxWickets) {
      maxWickets = totalWickets;
      topPlayer = { ...player, totalWickets };
    }
  }

  return topPlayer;
}