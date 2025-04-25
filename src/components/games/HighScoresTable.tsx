
import React from 'react';
import { Trophy } from "lucide-react";

interface HighScore {
  score: number;
  created_at: string;
}

interface HighScoresTableProps {
  scores: HighScore[];
}

const HighScoresTable: React.FC<HighScoresTableProps> = ({ scores }) => {
  if (!scores.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4 text-center gradient-text">Top Scores</h3>
      <div className="glass-card overflow-hidden border border-white/10">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3 flex items-center">
                  {index === 0 ? (
                    <Trophy className="h-4 w-4 text-yellow-400 mr-2" />
                  ) : (
                    <span className="font-mono w-6 text-center">{index + 1}</span>
                  )}
                </td>
                <td className="p-3 font-bold">{score.score}</td>
                <td className="p-3 text-sm text-gray-400">
                  {new Date(score.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighScoresTable;
