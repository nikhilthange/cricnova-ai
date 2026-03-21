"use client";

import { useEffect, useState } from "react";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("https://cricnova-backend.onrender.com/api/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data.data));
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>

      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-4 border border-gray-700 rounded-lg"
          >
            <h2 className="text-lg font-semibold">{team.name}</h2>
            <p className="text-sm text-gray-400">{team.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}