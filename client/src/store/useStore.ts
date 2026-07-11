import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Team } from '../types';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  favoriteTeams: Team[];
  toggleFavoriteTeam: (team: Team) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      user: null,
      setUser: (user) => set({ user }),
      favoriteTeams: [],
      toggleFavoriteTeam: (team) => set((state) => {
        const isFav = state.favoriteTeams.find(t => t._id === team._id);
        if (isFav) {
          return { favoriteTeams: state.favoriteTeams.filter(t => t._id !== team._id) };
        } else {
          return { favoriteTeams: [...state.favoriteTeams, team] };
        }
      }),
    }),
    {
      name: 'cricnova-storage',
    }
  )
);
