import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials } from '@/types/auth';
import type { ApiResponse } from '@/types/api';
import { api } from '@/lib/api';
import { mockAuthResponse, MOCK_TOKEN } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isMockMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          if (token === MOCK_TOKEN) {
            setUser(mockAuthResponse.user);
            setIsMockMode(true);
          } else {
            const response = await api.get<ApiResponse<User>>('/auth/me');
            setUser(response.data);
          }
        }
      } catch {
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setError(null);
    try {
      const response = await api.post<ApiResponse<{ token: string; user: User }>>('/public/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      setUser(user);
      setIsMockMode(false);
    } catch {
      if (credentials.email === 'learner1@lms.com' && credentials.password === 'learner@123') {
        localStorage.setItem('authToken', MOCK_TOKEN);
        setUser(mockAuthResponse.user);
        setIsMockMode(true);
        console.warn('[Mock Mode] Using mock authentication — backend is offline');
      } else {
        setError('Login failed. Please check your credentials.');
        throw new Error('Login failed');
      }
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
    setIsMockMode(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        error,
        isMockMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
