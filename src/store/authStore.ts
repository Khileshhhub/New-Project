import { create } from 'zustand';
import { User } from '../types/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    // Simulate API call
    if (username === 'admin' && password === 'admin123') {
      set({
        user: { id: '1', username: 'admin', role: 'ADMIN' },
        isAuthenticated: true,
      });
    } else if (username === 'operator' && password === 'operator123') {
      set({
        user: { id: '2', username: 'operator', role: 'OPERATOR' },
        isAuthenticated: true,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));