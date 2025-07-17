import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

type UserStore = {
  user?: User | null;
  setUser: (user?: User | null) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
