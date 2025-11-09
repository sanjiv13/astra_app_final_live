'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { USER_ROLES, USER_STATUS, DEFAULT_ADMIN } from '@/lib/constants';

export interface User {
  id: string;
  email: string;
  name: string;
  role: typeof USER_ROLES[keyof typeof USER_ROLES];
  status: typeof USER_STATUS[keyof typeof USER_STATUS];
  team?: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
  logout: () => void;
  signup: (email: string, password: string, name: string, team: string) => Promise<{ success: boolean; message: string }>;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on component mount
    const savedUser = localStorage.getItem('astra-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('astra-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('astra-user', JSON.stringify(data.user));
        return { success: true, message: 'Login successful', user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const adminLogin = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
    try {
      // Check against default admin credentials
      if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        const adminUser: User = {
          id: 'admin-001',
          email: DEFAULT_ADMIN.email,
          name: 'ASTRA Admin',
          role: USER_ROLES.ADMIN,
          status: USER_STATUS.APPROVED,
          joinedAt: new Date().toISOString(),
        };
        
        setUser(adminUser);
        localStorage.setItem('astra-user', JSON.stringify(adminUser));
        return { success: true, message: 'Admin login successful', user: adminUser };
      } else {
        return { success: false, message: 'Invalid admin credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const signup = async (email: string, password: string, name: string, team: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, team }),
      });

      const data = await response.json();
      return { success: data.success, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('astra-user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    adminLogin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}