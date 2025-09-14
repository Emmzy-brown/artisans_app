import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Professional carpenter with 10+ years of experience',
    location: 'New York, NY',
    profession: 'Carpenter',
    skills: ['Woodworking', 'Furniture Making', 'Home Renovation'],
    rating: 4.8,
    reviewCount: 156,
    isVerified: true,
    joinedDate: '2022-01-15',
    portfolioImages: [],
    followers: 1250,
    following: 340,
  });

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    console.log('Login:', email, password);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Partial<User>) => {
    // Mock register - replace with actual API call
    console.log('Register:', userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};