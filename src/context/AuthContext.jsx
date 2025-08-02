import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simulate API call - accept any credentials
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          email: credentials.email,
          name: credentials.email.split('@')[0], // Use email prefix as name
          avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=06b6d4&color=fff`,
          joinedAt: new Date().toISOString(),
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        resolve({ success: true, user: userData });
      }, 1000);
    });
  };

  const signup = async (userData) => {
    // Simulate API call - accept any data
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=8b5cf6&color=fff`,
          joinedAt: new Date().toISOString(),
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve({ success: true, user: newUser });
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
