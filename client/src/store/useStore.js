import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      
      favoriteTeams: [],
      addFavoriteTeam: (teamId) =>
        set((state) => ({
          favoriteTeams: [...new Set([...state.favoriteTeams, teamId])],
        })),
      removeFavoriteTeam: (teamId) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.filter((id) => id !== teamId),
        })),
    }),
    {
      name: 'cricnova-storage',
    }
  )
);
