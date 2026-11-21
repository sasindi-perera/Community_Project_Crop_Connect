import {
  FirestoreFarmer,
  FirestoreBuyer,
  FirestoreCropListing,
  FirestoreBuyerOffer,
  FirestoreEnquiry,
  FirestoreMarketPrice,
  FirestorePricePrediction,
  FirestoreNotification,
  FirestoreCrop,
} from '../types/database';

export interface ValidationOutput {
  valid: boolean;
  errors: string[];
}

/**
 * Validates Sri Lankan coordinates (approx lat: 5.8-9.9, lng: 79.6-82.0)
 */
export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= 5.5 && lat <= 10.0 && lng >= 79.4 && lng <= 82.2;
}

/**
 * Validates farmer profile data before Firestore write
 */
export function validateFarmerInput(data: Partial<FirestoreFarmer>): ValidationOutput {
  const errors: string[] = [];
  if (!data.userId || data.userId.trim().length === 0) {
    errors.push('Farmer document must reference a valid userId.');
  }
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Farmer full name must be at least 2 characters.');
  }
  if (!data.district || data.district.trim().length === 0) {
    errors.push('District is required.');
  }
  if (data.landSizeAcres !== undefined && data.landSizeAcres <= 0) {
    errors.push('Land size in acres must be greater than 0.');
  }
  if (data.latitude !== undefined && data.longitude !== undefined) {
    if (!validateCoordinates(data.latitude, data.longitude)) {
      errors.push('Coordinates must be located within Sri Lanka geographical bounds.');
    }
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates buyer profile data before Firestore write
 */
export function validateBuyerInput(data: Partial<FirestoreBuyer>): ValidationOutput {
  const errors: string[] = [];
  if (!data.userId || data.userId.trim().length === 0) {
    errors.push('Buyer document must reference a valid userId.');
  }
  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.push('Business or buyer name must be at least 2 characters.');
  }
  if (!data.district || data.district.trim().length === 0) {
    errors.push('District is required.');
  }
  if (data.purchasingRequirements) {
    const { minOrderQuantityKg, maxOrderQuantityKg } = data.purchasingRequirements;
    if (minOrderQuantityKg < 0) {
      errors.push('Minimum order quantity cannot be negative.');
    }
    if (maxOrderQuantityKg <= 0 || maxOrderQuantityKg < minOrderQuantityKg) {
      errors.push('Maximum order quantity must be greater than or equal to minimum order quantity.');
    }
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates crop listing before Firestore write
 */
export function validateCropListingInput(
  data: Partial<FirestoreCropListing>,
  currentUserId?: string
): ValidationOutput {
  const errors: string[] = [];

  if (currentUserId && data.farmerId && data.farmerId !== currentUserId) {
    errors.push('Authorization violation: You can only publish or edit listings under your own farmer ID.');
  }

  if (!data.farmerId || data.farmerId.trim().length === 0) {
    errors.push('Crop listing must have a valid farmerId.');
  }
  if (!data.cropName || data.cropName.trim().length < 2) {
    errors.push('Crop name is required.');
  }
  if (!data.quantityKg || data.quantityKg <= 0) {
    errors.push('Quantity (kg) must be greater than 0.');
  }
  if (!data.askingPricePerKg || data.askingPricePerKg <= 0) {
    errors.push('Asking price per kg must be greater than 0.');
  }
  if (data.minOrderKg !== undefined && data.quantityKg !== undefined && data.minOrderKg > data.quantityKg) {
    errors.push('Minimum order quantity cannot exceed total available quantity.');
  }
  if (data.isRescueCrop) {
    if (!data.rescueReason) {
      errors.push('Rescue listings must specify an urgency reason.');
    }
    if (data.rescueDiscountPercentage !== undefined && (data.rescueDiscountPercentage < 0 || data.rescueDiscountPercentage > 100)) {
      errors.push('Rescue discount percentage must be between 0% and 100%.');
    }
  }
  if (!data.district || data.district.trim().length === 0) {
    errors.push('Listing location district is required.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates buyer offer before Firestore write
 */
export function validateBuyerOfferInput(
  data: Partial<FirestoreBuyerOffer>,
  currentUserId?: string
): ValidationOutput {
  const errors: string[] = [];

  if (currentUserId && data.buyerId && data.buyerId !== currentUserId) {
    errors.push('Authorization violation: Offers can only be placed under your authenticated buyer ID.');
  }
  if (!data.listingId || data.listingId.trim().length === 0) {
    errors.push('Buyer offer must reference a target cropListing document.');
  }
  if (!data.farmerId || data.farmerId.trim().length === 0) {
    errors.push('Buyer offer must specify the recipient farmerId.');
  }
  if (!data.offeredPricePerKg || data.offeredPricePerKg <= 0) {
    errors.push('Offered price per kg must be greater than 0.');
  }
  if (!data.requestedQuantityKg || data.requestedQuantityKg <= 0) {
    errors.push('Requested quantity (kg) must be greater than 0.');
  }
  if (data.buyerId && data.farmerId && data.buyerId === data.farmerId) {
    errors.push('Security constraint: Farmers cannot submit buyer offers to their own listings.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates enquiry message between farmer and buyer
 */
export function validateEnquiryInput(
  data: Partial<FirestoreEnquiry>,
  currentUserId?: string
): ValidationOutput {
  const errors: string[] = [];

  if (currentUserId && data.senderId && data.senderId !== currentUserId) {
    errors.push('Authorization violation: Sender ID must match current authenticated user.');
  }
  if (!data.recipientId || data.recipientId.trim().length === 0) {
    errors.push('Enquiry message must have a valid recipientId.');
  }
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Enquiry message cannot be blank.');
  }
  if (data.message && data.message.length > 2000) {
    errors.push('Message exceeds the maximum length of 2,000 characters.');
  }
  if (data.senderId && data.recipientId && data.senderId === data.recipientId) {
    errors.push('Sender and recipient cannot be the same user.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates market price entry (Admin verified)
 */
export function validateMarketPriceInput(data: Partial<FirestoreMarketPrice>): ValidationOutput {
  const errors: string[] = [];

  if (!data.cropName || data.cropName.trim().length === 0) {
    errors.push('Crop name is required for market price record.');
  }
  if (!data.marketCenter || data.marketCenter.trim().length === 0) {
    errors.push('Market center is required (e.g. Dambulla DEC).');
  }
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push('Valid date in YYYY-MM-DD format is required.');
  }
  if (data.wholesalePriceMin !== undefined && data.wholesalePriceMin < 0) {
    errors.push('Wholesale minimum price cannot be negative.');
  }
  if (data.wholesalePriceMax !== undefined && data.wholesalePriceMin !== undefined && data.wholesalePriceMax < data.wholesalePriceMin) {
    errors.push('Wholesale maximum price cannot be less than minimum price.');
  }
  if (data.wholesalePriceAvg !== undefined && data.wholesalePriceAvg <= 0) {
    errors.push('Wholesale average price must be greater than 0.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates price prediction record
 */
export function validatePricePredictionInput(data: Partial<FirestorePricePrediction>): ValidationOutput {
  const errors: string[] = [];

  if (!data.cropName || data.cropName.trim().length === 0) {
    errors.push('Crop name is required.');
  }
  if (!data.district || data.district.trim().length === 0) {
    errors.push('District is required.');
  }
  if (!data.predictedPricePerKg || data.predictedPricePerKg <= 0) {
    errors.push('Predicted price per kg must be greater than 0.');
  }
  if (data.confidenceScore !== undefined && (data.confidenceScore < 0 || data.confidenceScore > 1)) {
    errors.push('Confidence score must be between 0.0 and 1.0.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates notification entry
 */
export function validateNotificationInput(data: Partial<FirestoreNotification>): ValidationOutput {
  const errors: string[] = [];

  if (!data.userId || data.userId.trim().length === 0) {
    errors.push('Notification must specify a recipient userId.');
  }
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Notification title is required.');
  }
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Notification message is required.');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates crop master catalog entry (Admin only)
 */
export function validateCropMasterInput(data: Partial<FirestoreCrop>): ValidationOutput {
  const errors: string[] = [];

  if (!data.id || data.id.trim().length === 0) {
    errors.push('Crop master ID is required (e.g. crop_carrot).');
  }
  if (!data.commonName || data.commonName.trim().length === 0) {
    errors.push('Common English name is required.');
  }
  if (!data.sinhalaName || data.sinhalaName.trim().length === 0) {
    errors.push('Sinhala name is required.');
  }
  if (!data.category) {
    errors.push('Crop category is required.');
  }
  if (data.avgDambullaBenchmarkPrice !== undefined && data.avgDambullaBenchmarkPrice <= 0) {
    errors.push('Benchmark wholesale price must be greater than 0.');
  }
  return { valid: errors.length === 0, errors };
}
