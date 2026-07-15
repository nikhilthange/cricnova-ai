import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    country: string;
    image?: string;
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
      {player.image ? (
        <img src={player.image} alt={player.name} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-indigo-500/20" />
      ) : (
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border-2 border-indigo-500/20">
          <User className="w-10 h-10 text-indigo-500" />
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{player.name}</h3>
      <span className="px-3 py-1 mt-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium rounded-full">
        {player.country || 'Unknown Country'}
      </span>
    </motion.div>
  );
}
