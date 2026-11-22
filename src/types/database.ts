import { UserRole } from './user';
import { CropCategory, ListingStatus } from './listing';
import { CropQualityGrade } from './ai';

// ==========================================
// 1. USERS COLLECTION (`users`)
// ==========================================
export interface FirestoreUser {
  id: string; // Auth UID
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  district: string;
  province?: string;
  avatarUrl?: string;
  isVerified: boolean;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 2. FARMERS COLLECTION (`farmers`)
// ==========================================
export interface FirestoreFarmer {
  id: string; // Document ID = Auth UID
  userId: string; // Reference to users doc
  fullName: string;
  phone: string;
  email: string;
  farmName: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  landSizeAcres: number;
  primaryCrops: string[];
  farmingExperienceYears: number;
  govRegistrationNumber?: string;
  isCertifiedOrganic: boolean;
  rating: number;
  completedDeals: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 3. BUYERS COLLECTION (`buyers`)
// ==========================================
export type BuyerBusinessType =
  | 'wholesaler'
  | 'supermarket'
  | 'exporter'
  | 'restaurant'
  | 'retailer'
  | 'processor';

export type BuyerPaymentTerms =
  | 'cash_on_delivery'
  | 'instant_bank_transfer'
  | 'credit_7_days'
  | 'credit_14_days';

export interface BuyerPurchasingRequirements {
  preferredCrops: string[];
  minOrderQuantityKg: number;
  maxOrderQuantityKg: number;
  paymentTerms: BuyerPaymentTerms;
  preferredDeliveryMode: 'farmgate_pickup' | 'market_delivery';
  hasColdStorage: boolean;
  weeklyTargetBudgetLkr?: number;
  preferredDistricts?: string[];
}

export interface FirestoreBuyer {
  id: string; // Document ID = Auth UID
  userId: string; // Reference to users doc
  businessName: string;
  businessType: BuyerBusinessType;
  contactPerson: string;
  phone: string;
  email: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  purchasingRequirements: BuyerPurchasingRequirements;
  brNumber?: string;
  isVerifiedBusiness: boolean;
  rating: number;
  dealsCompleted: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 4. CROPS COLLECTION (`crops`)
// ==========================================
export interface FirestoreCrop {
  id: string; // e.g. "crop_carrot", "crop_tomato"
  commonName: string;
  sinhalaName: string;
  tamilName: string;
  botanicalName?: string;
  category: CropCategory;
  seasonalPeakMonths: number[]; // 1 = January, 12 = December
  standardShelfLifeDays: number;
  standardUnit: 'kg' | 'g' | 'bundle' | 'crate';
  gradeDescriptions: {
    gradeA: string;
    gradeB: string;
    gradeC: string;
  };
  avgDambullaBenchmarkPrice: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 5. CROP LISTINGS COLLECTION (`cropListings`)
// ==========================================
export interface FirestoreCropListing {
  id: string;
  farmerId: string; // Reference to farmers / users doc UID
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  cropId: string; // Reference to crops doc
  cropName: string;
  sinhalaName?: string;
  tamilName?: string;
  category: CropCategory;
  grade: CropQualityGrade;
  quantityKg: number;
  minOrderKg: number;
  askingPricePerKg: number;
  minAcceptablePricePerKg?: number;
  originalPricePerKg?: number;
  isRescueCrop: boolean;
  rescueDiscountPercentage?: number;
  rescueReason?: 'rapid_spoilage' | 'oversupply' | 'transport_canceled' | 'urgent_cash_need';
  hoursRemaining?: number;
  harvestDate: string;
  expiryDate: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  description: string;
  status: ListingStatus;
  activeOffersCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 6. BUYER OFFERS COLLECTION (`buyerOffers`)
// ==========================================
export type BuyerOfferStatus =
  | 'pending'
  | 'countered'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'
  | 'completed';

export interface FirestoreBuyerOffer {
  id: string;
  listingId: string; // Reference to cropListings doc
  cropName: string;
  farmerId: string; // Reference to seller user UID
  farmerName: string;
  buyerId: string; // Reference to buyer user UID
  buyerName: string;
  buyerPhone: string;
  buyerBusinessType: string;
  offeredPricePerKg: number;
  requestedQuantityKg: number;
  totalAmount: number; // offeredPricePerKg * requestedQuantityKg
  farmerAskingPricePerKg: number;
  counterPricePerKg?: number;
  status: BuyerOfferStatus;
  proposedPickupDate: string;
  transportProvidedByBuyer: boolean;
  notes?: string;
  farmerResponseNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 7. ENQUIRIES COLLECTION (`enquiries`)
// ==========================================
export interface FirestoreEnquiry {
  id: string;
  listingId?: string; // Reference to crop listing if context is a listing
  offerId?: string; // Reference to buyer offer if context is an offer
  cropName?: string;
  farmerId: string; // Reference to farmer UID
  buyerId: string; // Reference to buyer UID
  senderId: string; // Auth UID of author
  senderName: string;
  senderRole: UserRole;
  recipientId: string; // Auth UID of receiver
  recipientName: string;
  message: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 8. MARKET PRICES COLLECTION (`marketPrices`)
// ==========================================
export type MarketCenterName =
  | 'Dambulla DEC'
  | 'Pettah Manning'
  | 'Kandy Central'
  | 'Nuwara Eliya Wholesale'
  | 'Meegoda DEC'
  | 'Keppetipola DEC'
  | 'Norochcholai DEC'
  | 'Embilipitiya DEC';

export interface FirestoreMarketPrice {
  id: string;
  cropId: string;
  cropName: string;
  sinhalaName?: string;
  marketCenter: MarketCenterName;
  date: string; // YYYY-MM-DD
  wholesalePriceMin: number;
  wholesalePriceMax: number;
  wholesalePriceAvg: number;
  retailPriceAvg: number;
  grade: CropQualityGrade;
  trend: 'up' | 'down' | 'neutral';
  dailyPercentageChange: number;
  supplyVolumeTons: number;
  source: 'HARTI' | 'Department of Agriculture' | 'Economic Centre Daily Board' | 'Field Inspector';
  verifiedByAdminId?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 9. PRICE PREDICTIONS COLLECTION (`pricePredictions`)
// ==========================================
export interface FirestorePricePrediction {
  id: string;
  cropId: string;
  cropName: string;
  district: string;
  season: 'Yala' | 'Maha' | 'Inter-monsoon';
  grade: CropQualityGrade;
  predictedPricePerKg: number;
  fairPriceRange: {
    min: number;
    max: number;
  };
  recommendedRescuePrice: number;
  confidenceScore: number; // 0.0 - 1.0
  marketTrend: 'rising' | 'stable' | 'falling';
  marketTrendPercentage: number;
  wholesaleBenchmark: number;
  demandIndex: 'high' | 'moderate' | 'low';
  recommendedAction: string;
  modelVersion: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 10. NOTIFICATIONS COLLECTION (`notifications`)
// ==========================================
export type NotificationType =
  | 'offer_received'
  | 'offer_accepted'
  | 'offer_countered'
  | 'offer_rejected'
  | 'rescue_alert'
  | 'price_surge'
  | 'enquiry_message'
  | 'system';

export interface FirestoreNotification {
  id: string;
  userId: string; // Recipient Auth UID
  userRole: UserRole;
  title: string;
  message: string;
  type: NotificationType;
  referenceId?: string; // listingId, offerId, enquiryId
  referenceType?: 'cropListings' | 'buyerOffers' | 'enquiries' | 'pricePredictions' | 'marketPrices';
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// COLLECTION NAMES CONSTANT
// ==========================================
export const COLLECTIONS = {
  USERS: 'users',
  FARMERS: 'farmers',
  BUYERS: 'buyers',
  CROPS: 'crops',
  CROP_LISTINGS: 'cropListings',
  BUYER_OFFERS: 'buyerOffers',
  ENQUIRIES: 'enquiries',
  MARKET_PRICES: 'marketPrices',
  PRICE_PREDICTIONS: 'pricePredictions',
  NOTIFICATIONS: 'notifications',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
