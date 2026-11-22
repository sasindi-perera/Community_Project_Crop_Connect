import { CropQualityGrade, AIPricePredictionResponse } from './ai';
import { UserLocation } from './user';

export type ListingStatus = 'active' | 'negotiating' | 'sold' | 'expired';
export type CropCategory = 'vegetables' | 'fruits' | 'grains' | 'tubers' | 'spices';

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  cropName: string;
  sinhalaName?: string;
  tamilName?: string;
  category: CropCategory;
  grade: CropQualityGrade;
  quantityKg: number;
  minOrderKg: number;
  askingPricePerKg: number;
  originalPricePerKg?: number;
  isRescueCrop: boolean;
  rescueDiscountPercentage?: number;
  rescueReason?: 'rapid_spoilage' | 'oversupply' | 'transport_canceled' | 'urgent_cash_need';
  hoursRemaining?: number;
  harvestDate: string;
  expiryDate?: string;
  location: UserLocation;
  distanceKm?: number;
  images: string[];
  description: string;
  status: ListingStatus;
  aiSuggestedPrice?: Partial<AIPricePredictionResponse>;
  createdAt: string;
  updatedAt: string;
}

export interface BuyerRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  cropName: string;
  category: CropCategory;
  requiredQuantityKg: number;
  targetPricePerKg: number;
  preferredDistricts: string[];
  maxDistanceKm?: number;
  neededByDate: string;
  status: 'open' | 'matched' | 'fulfilled' | 'closed';
  createdAt: string;
}
