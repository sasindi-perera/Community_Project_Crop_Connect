import { CropListing } from '../types/listing';
import { UserProfile } from '../types/user';

export const MOCK_FARMER_USER: UserProfile = {
  id: 'farmer_001',
  fullName: 'Sunil Bandara',
  phone: '+94 77 123 4567',
  email: 'sunil.bandara@cropconnect.lk',
  role: 'farmer',
  location: {
    latitude: 6.9497,
    longitude: 80.7891,
    district: 'Nuwara Eliya',
    address: 'Kandapola Agrarian Zone, Nuwara Eliya',
    province: 'Central',
  },
  farmName: 'Green Mountain Hill Farm',
  farmSizeAcres: 4.5,
  rating: 4.8,
  dealsCompleted: 48,
  isVerified: true,
  createdAt: '2025-03-12',
};

export const MOCK_BUYER_USER: UserProfile = {
  id: 'buyer_001',
  fullName: 'Dilan Perera',
  phone: '+94 71 987 6543',
  email: 'dilan.freshmart@cropconnect.lk',
  role: 'buyer',
  location: {
    latitude: 6.9271,
    longitude: 79.8612,
    district: 'Colombo',
    address: 'Manning Wholesale Market, Pettah',
    province: 'Western',
  },
  buyerBusinessType: 'wholesaler',
  rating: 4.9,
  dealsCompleted: 94,
  isVerified: true,
  createdAt: '2025-01-20',
};

export const MOCK_ADMIN_USER: UserProfile = {
  id: 'admin_001',
  fullName: 'Dr. Senarath Alwis',
  phone: '+94 11 234 5678',
  email: 'senarath.agrarian@gov.lk',
  role: 'admin',
  location: {
    latitude: 6.9271,
    longitude: 79.8612,
    district: 'Colombo',
    address: 'Department of Agrarian Development, Colombo 07',
    province: 'Western',
  },
  rating: 5.0,
  dealsCompleted: 0,
  isVerified: true,
  createdAt: '2024-11-01',
};

export const ALL_MOCK_LISTINGS: CropListing[] = [
  {
    id: 'crop_001',
    farmerId: 'farmer_001',
    farmerName: 'Sunil Bandara',
    farmerPhone: '+94 77 123 4567',
    farmerRating: 4.8,
    cropName: 'Upcountry Carrot',
    sinhalaName: 'කැරට්',
    tamilName: 'கேரட்',
    category: 'vegetables',
    grade: 'A',
    quantityKg: 1200,
    minOrderKg: 100,
    askingPricePerKg: 280,
    originalPricePerKg: 280,
    isRescueCrop: false,
    harvestDate: '2026-11-18',
    location: {
      latitude: 6.9497,
      longitude: 80.7891,
      district: 'Nuwara Eliya',
      address: 'Kandapola, Nuwara Eliya',
      province: 'Central',
    },
    distanceKm: 8.4,
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80'],
    description: 'Freshly harvested washed Grade-A carrots. Soil-free, high brix sweetness, crisp texture direct from hill farm.',
    status: 'active',
    aiSuggestedPrice: {
      fairPricePerKg: 285,
      minPricePerKg: 260,
      maxPricePerKg: 310,
      confidenceScore: 0.94,
    },
    createdAt: '2026-11-18T08:00:00Z',
    updatedAt: '2026-11-18T08:00:00Z',
  },
  {
    id: 'crop_002',
    farmerId: 'farmer_002',
    farmerName: 'Kamal Gunasekara',
    farmerPhone: '+94 71 456 7890',
    farmerRating: 4.6,
    cropName: 'Ripe Field Tomatoes',
    sinhalaName: 'තක්කාලි',
    tamilName: 'தக்காளி',
    category: 'vegetables',
    grade: 'A',
    quantityKg: 850,
    minOrderKg: 50,
    askingPricePerKg: 175,
    originalPricePerKg: 245,
    isRescueCrop: true,
    rescueDiscountPercentage: 28,
    rescueReason: 'rapid_spoilage',
    hoursRemaining: 16,
    harvestDate: '2026-11-17',
    location: {
      latitude: 7.4675,
      longitude: 80.6234,
      district: 'Matale',
      address: 'Near Dambulla Dedicated Economic Centre',
      province: 'Central',
    },
    distanceKm: 14.2,
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80'],
    description: 'URGENT RESCUE: 850kg of prime ripe tomatoes need same-day pickup to avoid post-harvest rot. Discounted by 28%.',
    status: 'active',
    aiSuggestedPrice: {
      fairPricePerKg: 240,
      recommendedRescuePrice: 175,
      confidenceScore: 0.92,
    },
    createdAt: '2026-11-19T06:00:00Z',
    updatedAt: '2026-11-19T06:00:00Z',
  },
  {
    id: 'crop_003',
    farmerId: 'farmer_003',
    farmerName: 'T. Murugan',
    farmerPhone: '+94 76 890 1234',
    farmerRating: 4.9,
    cropName: 'Jaffna Red Onions',
    sinhalaName: 'රතු ළුණු',
    tamilName: 'சின்ன வெங்காயம்',
    category: 'vegetables',
    grade: 'A',
    quantityKg: 2500,
    minOrderKg: 250,
    askingPricePerKg: 380,
    originalPricePerKg: 380,
    isRescueCrop: false,
    harvestDate: '2026-11-15',
    location: {
      latitude: 9.6615,
      longitude: 80.0255,
      district: 'Jaffna',
      address: 'Thirunelveli Agrarian Belt, Jaffna',
      province: 'Northern',
    },
    distanceKm: 42.5,
    images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80'],
    description: 'Sun-cured premium Jaffna red onions packed in 50kg ventilated mesh sacks. Long shelf life, pungent aroma.',
    status: 'active',
    aiSuggestedPrice: {
      fairPricePerKg: 385,
      minPricePerKg: 360,
      maxPricePerKg: 410,
      confidenceScore: 0.96,
    },
    createdAt: '2026-11-16T10:00:00Z',
    updatedAt: '2026-11-16T10:00:00Z',
  },
  {
    id: 'crop_004',
    farmerId: 'farmer_004',
    farmerName: 'Ranjith Silva',
    farmerPhone: '+94 77 345 6789',
    farmerRating: 4.7,
    cropName: 'Welimada Crisp Leeks',
    sinhalaName: 'ලීක්ස්',
    tamilName: 'லீக்ස්',
    category: 'vegetables',
    grade: 'B',
    quantityKg: 600,
    minOrderKg: 50,
    askingPricePerKg: 155,
    originalPricePerKg: 215,
    isRescueCrop: true,
    rescueDiscountPercentage: 27,
    rescueReason: 'transport_canceled',
    hoursRemaining: 10,
    harvestDate: '2026-11-18',
    location: {
      latitude: 6.9934,
      longitude: 81.0550,
      district: 'Badulla',
      address: 'Welimada Agricultural Basin',
      province: 'Uva',
    },
    distanceKm: 26.8,
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80'],
    description: 'Transport canceled due to lorry breakdown. 600kg bundled fresh green leeks at farm gate for quick pickup.',
    status: 'active',
    aiSuggestedPrice: {
      fairPricePerKg: 210,
      recommendedRescuePrice: 155,
      confidenceScore: 0.89,
    },
    createdAt: '2026-11-19T07:30:00Z',
    updatedAt: '2026-11-19T07:30:00Z',
  },
  {
    id: 'crop_005',
    farmerId: 'farmer_005',
    farmerName: 'Nihal Alwis',
    farmerPhone: '+94 72 333 4444',
    farmerRating: 4.9,
    cropName: 'Keeri Samba Paddy',
    sinhalaName: 'කීරි සම්බා වී',
    tamilName: 'கீரி சம்பா நெல்',
    category: 'grains',
    grade: 'A',
    quantityKg: 5000,
    minOrderKg: 500,
    askingPricePerKg: 142,
    originalPricePerKg: 142,
    isRescueCrop: false,
    harvestDate: '2026-11-10',
    location: {
      latitude: 7.9403,
      longitude: 81.0188,
      district: 'Polonnaruwa',
      address: 'Minneriya Paddy Fields, Polonnaruwa',
      province: 'North Central',
    },
    distanceKm: 68.0,
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80'],
    description: 'Dry harvested Keeri Samba moisture level < 14%. Cleaned and stored in agrarian moisture-proof warehouse.',
    status: 'active',
    aiSuggestedPrice: {
      fairPricePerKg: 145,
      minPricePerKg: 138,
      maxPricePerKg: 152,
      confidenceScore: 0.95,
    },
    createdAt: '2026-11-15T09:00:00Z',
    updatedAt: '2026-11-15T09:00:00Z',
  },
];

export const INITIAL_MOCK_LISTINGS = ALL_MOCK_LISTINGS;

export interface NearbyBuyerItem {
  id: string;
  name: string;
  companyName: string;
  type: 'Supermarket Chain' | 'Wholesale Broker' | 'Hotel & Resort' | 'Exporter' | 'Food Processor';
  district: string;
  distanceKm: number;
  phone: string;
  lookingFor: string;
  targetQuantityKg: number;
  maxBudgetPerKg: number;
  verified: boolean;
  rating: number;
  urgentNeeds: boolean;
}

export const MOCK_NEARBY_BUYERS: NearbyBuyerItem[] = [
  {
    id: 'buyer_101',
    name: 'Dilan Perera',
    companyName: 'Pettah Fresh Wholesale Hub',
    type: 'Wholesale Broker',
    district: 'Colombo',
    distanceKm: 12.5,
    phone: '+94 71 987 6543',
    lookingFor: 'Carrot & Leeks',
    targetQuantityKg: 3500,
    maxBudgetPerKg: 285,
    verified: true,
    rating: 4.9,
    urgentNeeds: true,
  },
  {
    id: 'buyer_102',
    name: 'Saman Jayasinghe',
    companyName: 'Lanka Fresh Supermarket Supply',
    type: 'Supermarket Chain',
    district: 'Kandy',
    distanceKm: 18.2,
    phone: '+94 77 654 3210',
    lookingFor: 'Grade-A Field Tomatoes',
    targetQuantityKg: 2000,
    maxBudgetPerKg: 210,
    verified: true,
    rating: 4.8,
    urgentNeeds: true,
  },
  {
    id: 'buyer_103',
    name: 'Ruwan Wijeratne',
    companyName: 'Highland Grand Hotel & Spa',
    type: 'Hotel & Resort',
    district: 'Nuwara Eliya',
    distanceKm: 6.8,
    phone: '+94 76 111 2233',
    lookingFor: 'Organic Vegetables & Salad Greens',
    targetQuantityKg: 500,
    maxBudgetPerKg: 340,
    verified: true,
    rating: 4.7,
    urgentNeeds: false,
  },
  {
    id: 'buyer_104',
    name: 'K. Balachandran',
    companyName: 'Ceylon Spice & Onion Exporters',
    type: 'Exporter',
    district: 'Jaffna',
    distanceKm: 34.0,
    phone: '+94 77 888 9900',
    lookingFor: 'Jaffna Red Onions (Grade A)',
    targetQuantityKg: 8000,
    maxBudgetPerKg: 390,
    verified: true,
    rating: 5.0,
    urgentNeeds: false,
  },
  {
    id: 'buyer_105',
    name: 'Priyantha Dissanayake',
    companyName: 'Dambulla Agro Processors',
    type: 'Food Processor',
    district: 'Matale',
    distanceKm: 15.4,
    phone: '+94 71 222 5566',
    lookingFor: 'Surplus Tomatoes & Pumpkin for Pulping',
    targetQuantityKg: 5000,
    maxBudgetPerKg: 150,
    verified: true,
    rating: 4.6,
    urgentNeeds: true,
  },
];

export interface PriceHistoryPoint {
  date: string;
  label: string;
  farmerGatePrice: number;
  dambullaWholesalePrice: number;
  pettahRetailPrice: number;
}

export const MOCK_PRICE_HISTORY_CARROT: PriceHistoryPoint[] = [
  { date: '2026-10-15', label: 'Oct W3', farmerGatePrice: 220, dambullaWholesalePrice: 250, pettahRetailPrice: 340 },
  { date: '2026-10-22', label: 'Oct W4', farmerGatePrice: 235, dambullaWholesalePrice: 265, pettahRetailPrice: 360 },
  { date: '2026-10-29', label: 'Nov W1', farmerGatePrice: 250, dambullaWholesalePrice: 280, pettahRetailPrice: 380 },
  { date: '2026-11-05', label: 'Nov W2', farmerGatePrice: 270, dambullaWholesalePrice: 300, pettahRetailPrice: 410 },
  { date: '2026-11-12', label: 'Nov W3', farmerGatePrice: 285, dambullaWholesalePrice: 315, pettahRetailPrice: 425 },
  { date: '2026-11-19', label: 'Today', farmerGatePrice: 280, dambullaWholesalePrice: 310, pettahRetailPrice: 420 },
];

export const MOCK_PRICE_HISTORY_TOMATO: PriceHistoryPoint[] = [
  { date: '2026-10-15', label: 'Oct W3', farmerGatePrice: 190, dambullaWholesalePrice: 220, pettahRetailPrice: 310 },
  { date: '2026-10-22', label: 'Oct W4', farmerGatePrice: 210, dambullaWholesalePrice: 245, pettahRetailPrice: 340 },
  { date: '2026-10-29', label: 'Nov W1', farmerGatePrice: 230, dambullaWholesalePrice: 265, pettahRetailPrice: 360 },
  { date: '2026-11-05', label: 'Nov W2', farmerGatePrice: 260, dambullaWholesalePrice: 290, pettahRetailPrice: 390 },
  { date: '2026-11-12', label: 'Nov W3', farmerGatePrice: 220, dambullaWholesalePrice: 250, pettahRetailPrice: 340 },
  { date: '2026-11-19', label: 'Today', farmerGatePrice: 175, dambullaWholesalePrice: 210, pettahRetailPrice: 290 },
];

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'rescue_alert' | 'price_surge' | 'inquiry' | 'deal_accepted' | 'system';
  timestamp: string;
  read: boolean;
  actionRoute?: string;
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_001',
    title: '🚨 Urgent Crop Rescue Alert!',
    message: '850kg of prime field tomatoes in Dambulla at risk of spoilage. 28% clearance discount available!',
    type: 'rescue_alert',
    timestamp: '15 mins ago',
    read: false,
    actionRoute: '/(tabs)/rescue',
  },
  {
    id: 'notif_002',
    title: '📈 Wholesale Price Surge: Carrots',
    message: 'Carrot wholesale rates at Dambulla rose by +3.2% today to Rs. 285/kg due to rainy harvest delays.',
    type: 'price_surge',
    timestamp: '2 hours ago',
    read: false,
    actionRoute: '/price-history',
  },
  {
    id: 'notif_003',
    title: '💬 New Inbound Offer from Pettah Fresh',
    message: 'Buyer Dilan Perera offered Rs. 280/kg for your 1,200kg Upcountry Carrot lot.',
    type: 'inquiry',
    timestamp: '4 hours ago',
    read: true,
  },
  {
    id: 'notif_004',
    title: '✅ Deal Completed & Payment Cleared',
    message: 'Pickup confirmed for 400kg Leeks with Welimada Logistics. Rs. 62,000 recorded.',
    type: 'deal_accepted',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: 'notif_005',
    title: '🌱 Hector Kobbekaduwa Agrarian Baseline Synced',
    message: 'AI Price Predictor weights recalibrated with Central Bank and HARTI weekly price indices.',
    type: 'system',
    timestamp: '2 days ago',
    read: true,
  },
];
