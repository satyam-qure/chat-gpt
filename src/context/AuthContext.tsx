import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  // Add more user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const storedUser = localStorage.getItem('user');
      
      if (isLoggedIn === 'true' && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string) => {
    try {
      // In a real application, you would validate credentials with your backend
      // For now, we'll simulate a successful login
      const user = { email };
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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