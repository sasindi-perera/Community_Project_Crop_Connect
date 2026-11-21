export interface DistrictInfo {
  name: string;
  province: string;
  majorHub?: string;
  latitude: number;
  longitude: number;
}

export const SRI_LANKA_DISTRICTS: DistrictInfo[] = [
  { name: 'Nuwara Eliya', province: 'Central', majorHub: 'Keppetipola Economic Centre', latitude: 6.9497, longitude: 80.7891 },
  { name: 'Matale', province: 'Central', majorHub: 'Dambulla Dedicated Economic Centre', latitude: 7.4675, longitude: 80.6234 },
  { name: 'Kandy', province: 'Central', majorHub: 'Kandy Market', latitude: 7.2906, longitude: 80.6337 },
  { name: 'Badulla', province: 'Uva', majorHub: 'Bandarawela / Welimada', latitude: 6.9934, longitude: 81.0550 },
  { name: 'Monaragala', province: 'Uva', majorHub: 'Monaragala Agrarian Center', latitude: 6.8728, longitude: 81.3507 },
  { name: 'Anuradhapura', province: 'North Central', majorHub: 'Thambuttegama Economic Centre', latitude: 8.3114, longitude: 80.4037 },
  { name: 'Polonnaruwa', province: 'North Central', majorHub: 'Polonnaruwa Rice Hub', latitude: 7.9403, longitude: 81.0188 },
  { name: 'Kurunegala', province: 'North Western', majorHub: 'Kurunegala Wholesale Market', latitude: 7.4863, longitude: 80.3623 },
  { name: 'Puttalam', province: 'North Western', majorHub: 'Norochcholai Vegetable Hub', latitude: 8.0362, longitude: 79.8283 },
  { name: 'Colombo', province: 'Western', majorHub: 'Pettah Wholesale / Manning Market', latitude: 6.9271, longitude: 79.8612 },
  { name: 'Gampaha', province: 'Western', majorHub: 'Veyangoda Economic Centre', latitude: 7.0840, longitude: 79.9939 },
  { name: 'Kalutara', province: 'Western', majorHub: 'Meegoda Economic Centre', latitude: 6.5854, longitude: 79.9607 },
  { name: 'Jaffna', province: 'Northern', majorHub: 'Thirunelveli Market', latitude: 9.6615, longitude: 80.0255 },
  { name: 'Kilinochchi', province: 'Northern', majorHub: 'Kilinochchi Town Market', latitude: 9.3803, longitude: 80.3770 },
  { name: 'Mannar', province: 'Northern', majorHub: 'Mannar Town Hub', latitude: 8.9810, longitude: 79.9044 },
  { name: 'Vavuniya', province: 'Northern', majorHub: 'Vavuniya Economic Centre', latitude: 8.7514, longitude: 80.4971 },
  { name: 'Mullaitivu', province: 'Northern', majorHub: 'Mullaitivu Center', latitude: 9.2671, longitude: 80.8143 },
  { name: 'Batticaloa', province: 'Eastern', majorHub: 'Batticaloa Central Market', latitude: 7.7102, longitude: 81.6924 },
  { name: 'Ampara', province: 'Eastern', majorHub: 'Ampara Agrarian Hub', latitude: 7.2912, longitude: 81.6724 },
  { name: 'Trincomalee', province: 'Eastern', majorHub: 'Trincomalee Market', latitude: 8.5874, longitude: 81.2152 },
  { name: 'Galle', province: 'Southern', majorHub: 'Galle Fair', latitude: 6.0535, longitude: 80.2210 },
  { name: 'Matara', province: 'Southern', majorHub: 'Matara Central Market', latitude: 5.9549, longitude: 80.5550 },
  { name: 'Hambantota', province: 'Southern', majorHub: 'Embilipitiya Economic Centre', latitude: 6.1429, longitude: 81.1212 },
  { name: 'Ratnapura', province: 'Sabaragamuwa', majorHub: 'Ratnapura Town Market', latitude: 6.7056, longitude: 80.3847 },
  { name: 'Kegalle', province: 'Sabaragamuwa', majorHub: 'Kegalle Agricultural Center', latitude: 7.2513, longitude: 80.3464 },
];

export const CROP_CATEGORIES = [
  { id: 'all', label: 'All Crops', icon: 'grid-outline' },
  { id: 'vegetables', label: 'Vegetables', icon: 'leaf-outline' },
  { id: 'fruits', label: 'Fruits', icon: 'nutrition-outline' },
  { id: 'grains', label: 'Grains & Paddy', icon: 'flower-outline' },
  { id: 'tubers', label: 'Tubers & Roots', icon: 'earth-outline' },
  { id: 'spices', label: 'Spices', icon: 'flame-outline' },
];

export interface CropInfo {
  id: string;
  name: string;
  sinhalaName: string;
  tamilName: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'tubers' | 'spices';
  perishability: 'high' | 'medium' | 'low';
  typicalShelfLifeDays: number;
  benchmarkPriceLkrPerKg: number;
}

export const POPULAR_CROPS: CropInfo[] = [
  { id: 'rice', name: 'Rice (Samba / Nadu)', sinhalaName: 'සහල් (සම්බා / නාඩු)', tamilName: 'அரிசி', category: 'grains', perishability: 'low', typicalShelfLifeDays: 180, benchmarkPriceLkrPerKg: 220 },
  { id: 'green_beans', name: 'Green Beans (Bonchi)', sinhalaName: 'බෝංචි', tamilName: 'பீன்ஸ்', category: 'vegetables', perishability: 'high', typicalShelfLifeDays: 4, benchmarkPriceLkrPerKg: 340 },
  { id: 'carrot', name: 'Carrot (Upcountry)', sinhalaName: 'කැරට්', tamilName: 'கேரட்', category: 'vegetables', perishability: 'medium', typicalShelfLifeDays: 7, benchmarkPriceLkrPerKg: 280 },
  { id: 'leeks', name: 'Leeks', sinhalaName: 'ලීක්ස්', tamilName: 'லீக்ஸ்', category: 'vegetables', perishability: 'high', typicalShelfLifeDays: 4, benchmarkPriceLkrPerKg: 210 },
  { id: 'cabbage', name: 'Cabbage', sinhalaName: 'ගෝවා', tamilName: 'முட்டைக்கோஸ்', category: 'vegetables', perishability: 'medium', typicalShelfLifeDays: 6, benchmarkPriceLkrPerKg: 160 },
  { id: 'tomato', name: 'Tomato', sinhalaName: 'තක්කාලි', tamilName: 'தக்காளி', category: 'vegetables', perishability: 'high', typicalShelfLifeDays: 3, benchmarkPriceLkrPerKg: 240 },
  { id: 'green_chilli', name: 'Green Chilli', sinhalaName: 'අමු මිරිස්', tamilName: 'பச்சை மிளகாய்', category: 'spices', perishability: 'high', typicalShelfLifeDays: 5, benchmarkPriceLkrPerKg: 450 },
  { id: 'big_onion', name: 'Big Onion', sinhalaName: 'ලොකු ළුණු', tamilName: 'பெரிய வெங்காயம்', category: 'vegetables', perishability: 'low', typicalShelfLifeDays: 21, benchmarkPriceLkrPerKg: 320 },
  { id: 'red_onion', name: 'Red Onion (Jaffna)', sinhalaName: 'රතු ළුණු', tamilName: 'சின்ன வெங்காயம்', category: 'vegetables', perishability: 'medium', typicalShelfLifeDays: 14, benchmarkPriceLkrPerKg: 390 },
  { id: 'potato', name: 'Potato (Nuwara Eliya)', sinhalaName: 'අල', tamilName: 'உருளைக்கிழங்கு', category: 'tubers', perishability: 'low', typicalShelfLifeDays: 30, benchmarkPriceLkrPerKg: 340 },
  { id: 'brinjal', name: 'Brinjal / Eggplant', sinhalaName: 'වම්බටු', tamilName: 'கத்தரிக்காய்', category: 'vegetables', perishability: 'high', typicalShelfLifeDays: 4, benchmarkPriceLkrPerKg: 190 },
  { id: 'pumpkin', name: 'Pumpkin', sinhalaName: 'වට්ටක්කා', tamilName: 'பூசணிக்காய்', category: 'vegetables', perishability: 'low', typicalShelfLifeDays: 30, benchmarkPriceLkrPerKg: 130 },
  { id: 'papaya', name: 'Red Lady Papaya', sinhalaName: 'පැපොල්', tamilName: 'பப்பாளி', category: 'fruits', perishability: 'high', typicalShelfLifeDays: 4, benchmarkPriceLkrPerKg: 150 },
  { id: 'banana', name: 'Ambul Banana', sinhalaName: 'ඇඹුල් කෙසෙල්', tamilName: 'வாழைப்பழம்', category: 'fruits', perishability: 'high', typicalShelfLifeDays: 5, benchmarkPriceLkrPerKg: 180 },
  { id: 'paddy_samba', name: 'Keeri Samba Paddy', sinhalaName: 'කීරි සම්බා වී', tamilName: 'கீரி சம்பா நெல்', category: 'grains', perishability: 'low', typicalShelfLifeDays: 180, benchmarkPriceLkrPerKg: 140 },
];
