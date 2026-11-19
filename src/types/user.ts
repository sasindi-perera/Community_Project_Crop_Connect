export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface UserLocation {
  latitude: number;
  longitude: number;
  district: string;
  address?: string;
  province?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: UserRole;
  location: UserLocation;
  farmName?: string;
  farmSizeAcres?: number;
  buyerBusinessType?: 'wholesaler' | 'supermarket' | 'restaurant' | 'retailer' | 'individual';
  rating: number;
  dealsCompleted: number;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}
