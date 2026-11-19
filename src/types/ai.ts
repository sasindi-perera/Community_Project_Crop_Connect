export type CropQualityGrade = 'A' | 'B' | 'C';

export interface AIPricePredictionRequest {
  cropName: string;
  district: string;
  grade: CropQualityGrade;
  quantityKg: number;
  harvestDate?: string;
  isRescue?: boolean;
}

export interface AIPricePredictionResponse {
  cropName: string;
  district: string;
  grade: CropQualityGrade;
  fairPricePerKg: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  recommendedRescuePrice: number;
  currency: string;
  confidenceScore: number;
  marketTrend: 'rising' | 'stable' | 'falling';
  marketTrendPercentage: number;
  wholesaleBaseline: number;
  insight: string;
  recommendedAction: string;
}

export interface MarketTickerItem {
  cropName: string;
  sinhalaName: string;
  currentAvgLkr: number;
  change24h: number; // positive or negative percentage
  volumeAvailableKg: number;
  trend: 'up' | 'down' | 'neutral';
}
