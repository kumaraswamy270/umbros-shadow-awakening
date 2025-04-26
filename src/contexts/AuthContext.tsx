
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsAuthenticated(true);
      setUsername(savedUser);
    }
  }, []);

  const signup = async (username: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find((user: string) => user === username)) {
      return false;
    }

    // Save new user
    if (username && password.length >= 6) {
      const updatedUsers = [...existingUsers, username];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem(`password_${username}`, password);
      return true;
    }
    return false;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check if user exists and password matches
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const storedPassword = localStorage.getItem(`password_${username}`);
    
    if (existingUsers.includes(username) && password === storedPassword) {
      setIsAuthenticated(true);
      setUsername(username);
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
