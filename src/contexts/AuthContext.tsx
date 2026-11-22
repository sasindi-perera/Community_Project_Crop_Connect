import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile, UserRole } from '../types/user';
import {
  RegisterData,
  loginWithFirebase,
  registerWithFirebase,
  logoutWithFirebase,
  sendPasswordReset,
} from '../services/authService';
import {
  MOCK_FARMER_USER,
  MOCK_BUYER_USER,
  MOCK_ADMIN_USER,
} from '../services/mockDataService';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, hintRole?: UserRole) => Promise<UserProfile>;
  register: (data: RegisterData) => Promise<UserProfile>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  switchRole: (newRole: UserRole) => void;
  clearError: () => void;
  setUser: (user: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: MOCK_FARMER_USER,
  role: 'farmer',
  isAuthenticated: true,
  loading: false,
  error: null,
  login: async () => MOCK_FARMER_USER,
  register: async () => MOCK_FARMER_USER,
  logout: async () => {},
  forgotPassword: async () => {},
  switchRole: () => {},
  clearError: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(MOCK_FARMER_USER);
  const [role, setRole] = useState<UserRole>('farmer');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for real Firebase Auth state changes
  useEffect(() => {
    let isMounted = true;

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!isMounted) return;

        if (firebaseUser) {
          try {
            // Fetch profile from Cloud Firestore
            const docRef = doc(db, 'users', firebaseUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && isMounted) {
              const profile = docSnap.data() as UserProfile;
              setUser(profile);
              setRole(profile.role);
              setIsAuthenticated(true);
            }
          } catch {
            // Retain active session
          }
        }
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch {
      // Fallback
    }
  }, []);

  const clearError = () => setError(null);

  const login = async (
    email: string,
    password: string,
    hintRole?: UserRole
  ): Promise<UserProfile> => {
    setLoading(true);
    setError(null);
    try {
      const profile = await loginWithFirebase(email, password, hintRole);
      setUser(profile);
      setRole(profile.role);
      setIsAuthenticated(true);
      return profile;
    } catch (err: any) {
      const msg = err?.message || 'Login failed. Please check your credentials.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<UserProfile> => {
    setLoading(true);
    setError(null);
    try {
      const profile = await registerWithFirebase(data);
      setUser(profile);
      setRole(profile.role);
      setIsAuthenticated(true);
      return profile;
    } catch (err: any) {
      const msg = err?.message || 'Registration failed. Please check your input.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await logoutWithFirebase();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordReset(email);
    } catch (err: any) {
      const msg = err?.message || 'Unable to send password reset email.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Demo role switcher for testing all 3 user roles
  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'farmer') {
      setUser(MOCK_FARMER_USER);
    } else if (newRole === 'buyer') {
      setUser(MOCK_BUYER_USER);
    } else {
      setUser(MOCK_ADMIN_USER);
    }
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        switchRole,
        clearError,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
