import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials } from './types';
import type { ApiResponse } from '@/types/api';
import { api } from '@/lib/api';
import { mockAuthResponse, MOCK_TOKEN, USE_MOCK } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
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

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        if (USE_MOCK) {
          setUser(mockAuthResponse.user);
        } else {
          const response = await api.get<ApiResponse<User>>('/auth/me');
          setUser(response.data);
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

    if (USE_MOCK) {
      if (credentials.email === 'learner1@lms.com' && credentials.password === 'learner@123') {
        localStorage.setItem('authToken', MOCK_TOKEN);
        setUser(mockAuthResponse.user);
      } else {
        setError('Invalid credentials. Use learner1@lms.com / learner@123 in mock mode.');
        throw new Error('Login failed');
      }
      return;
    }

    try {
      const response = await api.post<ApiResponse<{ token: string; user: User }>>('/public/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      setUser(user);
    } catch {
      setError('Login failed. Please check your credentials.');
      throw new Error('Login failed');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isLoading,
        error,
        isMockMode: USE_MOCK,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
