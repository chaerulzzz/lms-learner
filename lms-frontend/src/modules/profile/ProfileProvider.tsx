import React, { createContext, useContext, useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { USE_MOCK } from '@/lib/mockData';
import { useAuth } from '@/modules/auth';
import type { ApiResponse } from '@/types/api';
import type { UpdateProfileData, ChangePasswordData } from '@/modules/auth/types';
import type { UserStats, PublicProfile } from './types';

interface ProfileUpdateResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  updated_at: string;
}

async function updateProfileApi(data: UpdateProfileData): Promise<ProfileUpdateResponse> {
  if (USE_MOCK) {
    return {
      id: 1,
      email: 'learner1@lms.com',
      first_name: data.first_name || 'John',
      last_name: data.last_name || 'Doe',
      full_name: `${data.first_name || 'John'} ${data.last_name || 'Doe'}`,
      updated_at: new Date().toISOString(),
    };
  }
  const response = await api.put<ApiResponse<ProfileUpdateResponse>>('/auth/profile', data);
  return response.data;
}

async function changePasswordApi(data: ChangePasswordData): Promise<void> {
  if (USE_MOCK) {
    if (data.current_password === 'learner@123') return;
    throw new Error('Invalid old password');
  }
  await api.post<ApiResponse<null>>('/auth/change-password', {
    old_password: data.current_password,
    new_password: data.new_password,
  });
}

// Mock user stats
const mockUserStats: UserStats = {
  total_courses_enrolled: 8,
  total_courses_completed: 3,
  total_learning_hours: 45,
  average_quiz_score: 87.5,
  total_coins_earned: 500,
  total_coins_spent: 50,
  current_coin_balance: 450,
  badges_earned: 4,
  certificates_earned: 3,
  current_streak: 7,
  longest_streak: 15,
};

// Mock public profiles
const mockPublicProfiles: Record<number, PublicProfile> = {
  1: {
    id: 1,
    full_name: 'John Doe',
    department: 'Engineering',
    role: 'learner',
    total_learning_hours: 45,
    gmfc_coins: 450,
    current_badge_level: 'silver',
    courses_completed: 3,
    certificates: 3,
  },
  5: {
    id: 5,
    full_name: 'Alice Johnson',
    department: 'Engineering',
    role: 'learner',
    total_learning_hours: 120,
    gmfc_coins: 850,
    current_badge_level: 'gold',
    courses_completed: 8,
    certificates: 8,
  },
  3: {
    id: 3,
    full_name: 'Bob Smith',
    department: 'Product',
    role: 'learner',
    total_learning_hours: 38,
    gmfc_coins: 380,
    current_badge_level: 'silver',
    courses_completed: 4,
    certificates: 4,
  },
};

async function fetchUserStats(): Promise<UserStats> {
  if (USE_MOCK) {
    return mockUserStats;
  }
  const response = await api.get<ApiResponse<UserStats>>('/user/stats');
  return response.data;
}

async function fetchPublicProfile(userId: string): Promise<PublicProfile> {
  if (USE_MOCK) {
    const profile = mockPublicProfiles[Number(userId)];
    if (!profile) throw new Error('User not found');
    return profile;
  }
  const response = await api.get<ApiResponse<PublicProfile>>(`/user/profile/${userId}`);
  return response.data;
}

interface ProfileContextType {
  // Profile form
  profileForm: { first_name: string; last_name: string; department: string };
  setProfileField: (field: string, value: string) => void;
  handleProfileSubmit: (e: React.FormEvent) => Promise<void>;
  isProfileSaving: boolean;
  profileError: boolean;
  profileSuccess: boolean;
  // Password form
  passwordForm: { current_password: string; new_password: string; confirm_password: string };
  setPasswordField: (field: string, value: string) => void;
  handlePasswordSubmit: (e: React.FormEvent) => Promise<void>;
  isPasswordSaving: boolean;
  passwordError: string | null;
  passwordSuccess: boolean;
  // User info
  email: string;
  // User stats
  userStats: UserStats | null;
  userStatsLoading: boolean;
  userStatsError: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, updateUser } = useAuth();

  // User stats query
  const {
    data: userStats,
    isLoading: userStatsLoading,
    isError: userStatsError,
  } = useQuery({
    queryKey: ['profile', 'stats'],
    queryFn: fetchUserStats,
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    department: user?.department || '',
  });
  const [profileSuccess, setProfileSuccess] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
  });

  const setProfileField = useCallback((field: string, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleProfileSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(false);
    try {
      const result = await updateProfileMutation.mutateAsync({
        first_name: profileForm.first_name,
        last_name: profileForm.last_name,
        department: profileForm.department || undefined,
      });
      updateUser({
        first_name: result.first_name,
        last_name: result.last_name,
        full_name: result.full_name,
      });
      setProfileSuccess(true);
    } catch {
      // error handled by mutation
    }
  }, [profileForm, updateProfileMutation, updateUser]);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordApi,
  });

  const setPasswordField = useCallback((field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePasswordSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(false);
    setPasswordError(null);

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwordForm.new_password.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      setPasswordSuccess(true);
    } catch {
      setPasswordError('Failed to change password. Check your current password.');
    }
  }, [passwordForm, changePasswordMutation]);

  return (
    <ProfileContext.Provider
      value={{
        profileForm,
        setProfileField,
        handleProfileSubmit,
        isProfileSaving: updateProfileMutation.isPending,
        profileError: updateProfileMutation.isError,
        profileSuccess,
        passwordForm,
        setPasswordField,
        handlePasswordSubmit,
        isPasswordSaving: changePasswordMutation.isPending,
        passwordError,
        passwordSuccess,
        email: user?.email || '',
        userStats: userStats ?? null,
        userStatsLoading,
        userStatsError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// Export the fetchPublicProfile for use in PublicProfileView
export { fetchPublicProfile };

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
