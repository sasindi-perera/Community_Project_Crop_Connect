import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole } from '../types/user';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (newRole: UserRole) => void;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

const mockFarmer: UserProfile = {
  id: 'farmer_001',
  fullName: 'Sunil Bandara',
  phone: '+94 77 123 4567',
  email: 'sunil.bandara@cropconnect.lk',
  role: 'farmer',
  location: {
    latitude: 6.9497,
    longitude: 80.7891,
    district: 'Nuwara Eliya',
    address: 'Kandapola Road, Nuwara Eliya',
    province: 'Central',
  },
  farmName: 'Green Valley Organic Farm',
  farmSizeAcres: 3.5,
  rating: 4.8,
  dealsCompleted: 42,
  isVerified: true,
  createdAt: '2025-08-15',
};

const mockBuyer: UserProfile = {
  id: 'buyer_001',
  fullName: 'Dilan Perera',
  phone: '+94 71 987 6543',
  email: 'dilan.freshmart@cropconnect.lk',
  role: 'buyer',
  location: {
    latitude: 6.9271,
    longitude: 79.8612,
    district: 'Colombo',
    address: 'Manning Market, Pettah',
    province: 'Western',
  },
  buyerBusinessType: 'wholesaler',
  rating: 4.9,
  dealsCompleted: 88,
  isVerified: true,
  createdAt: '2025-05-10',
};

const AuthContext = createContext<AuthContextType>({
  user: mockFarmer,
  role: 'farmer',
  isAuthenticated: true,
  switchRole: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('farmer');
  const [user, setUser] = useState<UserProfile | null>(mockFarmer);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'farmer') {
      setUser(mockFarmer);
    } else if (newRole === 'buyer') {
      setUser(mockBuyer);
    } else {
      setUser({
        ...mockFarmer,
        id: 'admin_001',
        fullName: 'Agrarian Admin (Govt Liaison)',
        role: 'admin',
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        switchRole,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
