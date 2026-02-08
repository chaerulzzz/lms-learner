import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, isMockMode } from '@/lib/api';
import { mockApi } from '@/lib/mockData';
import type { AdminUser, LoginCredentials, AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const useMock = isMockMode();

  // Check if user is authenticated
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async (): Promise<AdminUser | null> => {
      const token = localStorage.getItem('admin_token');
      if (!token) return null;

      if (useMock) {
        return mockApi.getMe();
      }

      try {
        const response = await api.get('/auth/me');
        return response.data.data;
      } catch {
        localStorage.removeItem('admin_token');
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      if (useMock) {
        return mockApi.login(credentials.email, credentials.password);
      }

      const response = await api.post('/public/auth/login', credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('admin_token', data.token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    queryClient.setQueryData(['auth', 'me'], null);
    queryClient.clear();
  };

  const value: AuthContextType = {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading: !isInitialized || isLoading,
    isMockMode: useMock,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
