import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  name: string;
  avatar: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    bandcamp: string;
    soundcloud: string;
    appleMusic: string;
    spotify: string;
    other: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: () => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showProfileCreation: boolean;
  setShowProfileCreation: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('hibeats_authenticated');
    const savedProfile = localStorage.getItem('hibeats_profile');

    if (savedAuth === 'true' && savedProfile) {
      setIsAuthenticated(true);
      setUserProfile(JSON.parse(savedProfile));
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setShowProfileCreation(true);
    localStorage.setItem('hibeats_authenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setShowLoginModal(true);
    setShowProfileCreation(false);
    localStorage.removeItem('hibeats_authenticated');
    localStorage.removeItem('hibeats_profile');
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowProfileCreation(false);
    localStorage.setItem('hibeats_profile', JSON.stringify(profile));
  };

  const value: AuthContextType = {
    isAuthenticated,
    userProfile,
    login,
    logout,
    updateProfile,
    showLoginModal,
    setShowLoginModal,
    showProfileCreation,
    setShowProfileCreation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};