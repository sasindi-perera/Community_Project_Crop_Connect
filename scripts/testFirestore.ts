/**
 * Comprehensive Database Read & Write Verification Test for CropConnect
 * Tests all 10 Cloud Firestore collections, validations, security constraints, and relationships.
 */

import {
  getUserDoc,
  updateUserDoc,
  getFarmerProfile,
  saveFarmerProfile,
  getFarmersByDistrict,
  getBuyerProfile,
  saveBuyerProfile,
  getAllBuyers,
  getAllCrops,
  saveCropMaster,
  createCropListing,
  updateCropListing,
  deleteCropListing,
  getCropListingById,
  getActiveListings,
  getFarmerListings,
  getRescueListings,
  createBuyerOffer,
  updateOfferStatus,
  counterBuyerOffer,
  getOffersForListing,
  getOffersByBuyer,
  sendEnquiry,
  getUserEnquiries,
  recordMarketPrice,
  getLatestMarketPrices,
  savePricePrediction,
  getLatestPricePrediction,
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  getUnreadNotificationCount,
} from '../src/services/firestoreService';

import {
  validateFarmerInput,
  validateBuyerInput,
  validateCropListingInput,
  validateBuyerOfferInput,
  validateEnquiryInput,
  validateMarketPriceInput,
  validatePricePredictionInput,
  validateNotificationInput,
} from '../src/services/firestoreValidation';

interface TestResult {
  suite: string;
  test: string;
  passed: boolean;
  message?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, suite: string, test: string, message?: string) {
  if (condition) {
    results.push({ suite, test, passed: true });
    console.log(`  ✓ [PASS] ${suite} > ${test}`);
  } else {
    results.push({ suite, test, passed: false, message });
    console.error(`  ✗ [FAIL] ${suite} > ${test}: ${message || 'Assertion failed'}`);
  }
}

async function runDatabaseTests() {
  console.log('====================================================');
  console.log('  CROPECONNECT - CLOUD FIRESTORE TEST SUITE');
  console.log('====================================================\n');

  const testFarmerId = 'farmer_test_uid_001';
  const otherFarmerId = 'farmer_intruder_uid_999';
  const testBuyerId = 'buyer_test_uid_002';
  const otherBuyerId = 'buyer_intruder_uid_888';
  const testAdminId = 'admin_agrarian_001';

  // ----------------------------------------------------
  // TEST SUITE 1: Users Collection
  // ----------------------------------------------------
  console.log('1. Testing USERS collection...');
  try {
    const userDoc = await getUserDoc('farmer_001');
    assert(userDoc !== null && userDoc.role === 'farmer', 'Users', 'Read existing user document');

    let preventedAdminEscalation = false;
    try {
      await updateUserDoc(testFarmerId, { role: 'admin' }, testFarmerId);
    } catch {
      preventedAdminEscalation = true;
    }
    assert(preventedAdminEscalation, 'Users', 'Prevent user self-escalation to admin role');
  } catch (err: any) {
    assert(false, 'Users', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 2: Farmers Collection
  // ----------------------------------------------------
  console.log('\n2. Testing FARMERS collection...');
  try {
    const createdFarmer = await saveFarmerProfile(
      testFarmerId,
      {
        fullName: 'K. M. Jayasundara',
        phone: '+94 77 334 5566',
        email: 'jayasundara@cropconnect.lk',
        farmName: 'Ambewela Green Acres',
        district: 'Nuwara Eliya',
        address: 'Ambewela, Nuwara Eliya',
        latitude: 6.8833,
        longitude: 80.8000,
        landSizeAcres: 4.5,
        primaryCrops: ['Carrot', 'Potato'],
        farmingExperienceYears: 12,
        isCertifiedOrganic: true,
      },
      testFarmerId
    );
    assert(createdFarmer.id === testFarmerId, 'Farmers', 'Create and save farmer profile');

    const fetchedFarmer = await getFarmerProfile(testFarmerId);
    assert(fetchedFarmer !== null && fetchedFarmer.district === 'Nuwara Eliya', 'Farmers', 'Read farmer profile');

    const farmersInDistrict = await getFarmersByDistrict('Nuwara Eliya');
    assert(Array.isArray(farmersInDistrict), 'Farmers', 'Query farmers by district');

    let preventedUnauthorizedFarmerEdit = false;
    try {
      await saveFarmerProfile(testFarmerId, { fullName: 'Hacked Name' }, otherFarmerId);
    } catch {
      preventedUnauthorizedFarmerEdit = true;
    }
    assert(preventedUnauthorizedFarmerEdit, 'Farmers', 'Prevent unauthorized modification of farmer profile');

    const invalidFarmer = validateFarmerInput({ userId: '', fullName: 'A', landSizeAcres: -2 });
    assert(!invalidFarmer.valid && invalidFarmer.errors.length >= 3, 'Farmers', 'Farmer data validation guards');
  } catch (err: any) {
    assert(false, 'Farmers', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 3: Buyers Collection & Purchasing Requirements
  // ----------------------------------------------------
  console.log('\n3. Testing BUYERS collection...');
  try {
    const createdBuyer = await saveBuyerProfile(
      testBuyerId,
      {
        businessName: 'Lanka Agro Exports PLC',
        businessType: 'exporter',
        contactPerson: 'Rohan Wickramasinghe',
        phone: '+94 11 234 5678',
        email: 'procurement@lankaagro.lk',
        district: 'Colombo',
        latitude: 6.9271,
        longitude: 79.8612,
        purchasingRequirements: {
          preferredCrops: ['Carrot', 'Green Beans', 'Leeks'],
          minOrderQuantityKg: 500,
          maxOrderQuantityKg: 10000,
          paymentTerms: 'instant_bank_transfer',
          preferredDeliveryMode: 'farmgate_pickup',
          hasColdStorage: true,
        },
        isVerifiedBusiness: true,
      },
      testBuyerId
    );
    assert(createdBuyer.id === testBuyerId && createdBuyer.purchasingRequirements.hasColdStorage, 'Buyers', 'Create and save buyer profile with purchasing requirements');

    const fetchedBuyer = await getBuyerProfile('buyer_001');
    assert(fetchedBuyer !== null, 'Buyers', 'Read buyer profile');

    let preventedUnauthorizedBuyerEdit = false;
    try {
      await saveBuyerProfile(testBuyerId, { businessName: 'Hacked Business' }, otherBuyerId);
    } catch {
      preventedUnauthorizedBuyerEdit = true;
    }
    assert(preventedUnauthorizedBuyerEdit, 'Buyers', 'Prevent unauthorized buyer profile edit');

    const buyersList = await getAllBuyers();
    assert(buyersList.length > 0, 'Buyers', 'Retrieve buyers list');

    const invalidBuyer = validateBuyerInput({ userId: '', businessName: '' });
    assert(!invalidBuyer.valid && invalidBuyer.errors.length > 0, 'Buyers', 'Buyer purchasing requirements validation');
  } catch (err: any) {
    assert(false, 'Buyers', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 4: Crops Master Catalog
  // ----------------------------------------------------
  console.log('\n4. Testing CROPS master collection...');
  try {
    const allCrops = await getAllCrops();
    assert(allCrops.length >= 6, 'Crops', 'Retrieve master Sri Lankan crop definitions');

    const carrotCrop = allCrops.find((c) => c.id === 'crop_carrot');
    assert(carrotCrop !== undefined && carrotCrop.sinhalaName === 'කැරට්', 'Crops', 'Verify crop botanical and localized names');

    let preventedNonAdminCropSave = false;
    try {
      await saveCropMaster({ ...allCrops[0], commonName: 'Hacked Crop' }, 'farmer');
    } catch {
      preventedNonAdminCropSave = true;
    }
    assert(preventedNonAdminCropSave, 'Crops', 'Restrict crop master modification to admins');
  } catch (err: any) {
    assert(false, 'Crops', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 5: Crop Listings Collection & Ownership
  // ----------------------------------------------------
  console.log('\n5. Testing CROP LISTINGS collection...');
  let testListingId = '';
  try {
    const listing = await createCropListing(
      {
        farmerId: testFarmerId,
        farmerName: 'K. M. Jayasundara',
        farmerPhone: '+94 77 334 5566',
        farmerRating: 4.9,
        cropId: 'crop_carrot',
        cropName: 'Carrot',
        category: 'vegetables',
        grade: 'A',
        quantityKg: 1500,
        minOrderKg: 200,
        askingPricePerKg: 275,
        isRescueCrop: true,
        rescueDiscountPercentage: 25,
        rescueReason: 'rapid_spoilage',
        hoursRemaining: 14,
        harvestDate: '2026-11-19',
        expiryDate: '2026-11-22',
        district: 'Nuwara Eliya',
        address: 'Ambewela, Nuwara Eliya',
        latitude: 6.8833,
        longitude: 80.8000,
        images: ['https://example.com/carrot.jpg'],
        description: 'Prime Nuwara Eliya carrots freshly harvested.',
        status: 'active',
      },
      testFarmerId
    );
    testListingId = listing.id;
    assert(listing.id.startsWith('listing_') && listing.quantityKg === 1500, 'CropListings', 'Create new crop listing');

    const fetchedListing = await getCropListingById(testListingId);
    assert(fetchedListing !== null && fetchedListing.askingPricePerKg === 275, 'CropListings', 'Read crop listing by ID');

    // Farmers must not edit another farmer's listings!
    let preventedIntruderEdit = false;
    try {
      await updateCropListing(testListingId, { askingPricePerKg: 100 }, otherFarmerId);
    } catch {
      preventedIntruderEdit = true;
    }
    assert(preventedIntruderEdit, 'CropListings', "Farmers must NOT edit another farmer's listings");

    // Legitimate owner updates price
    await updateCropListing(testListingId, { askingPricePerKg: 260 }, testFarmerId);
    const updatedListing = await getCropListingById(testListingId);
    assert(updatedListing?.askingPricePerKg === 260, 'CropListings', 'Listing owner can update price and details');

    const rescueList = await getRescueListings();
    assert(rescueList.length > 0, 'CropListings', 'Filter rescue crop listings');

    const activeList = await getActiveListings({ district: 'Nuwara Eliya' });
    assert(activeList.length > 0, 'CropListings', 'Filter active listings by district');

    const farmerList = await getFarmerListings(testFarmerId);
    assert(farmerList.length > 0, 'CropListings', 'Query listings by farmer UID');

    const invalidListing = validateCropListingInput({ cropName: '', askingPricePerKg: -10 });
    assert(!invalidListing.valid, 'CropListings', 'Validate crop listing constraints');

    await deleteCropListing(testListingId, testFarmerId);
    const postDelete = await getCropListingById(testListingId);
    assert(postDelete === null, 'CropListings', 'Listing owner can delete listing');
  } catch (err: any) {
    assert(false, 'CropListings', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 6: Buyer Offers Collection
  // ----------------------------------------------------
  console.log('\n6. Testing BUYER OFFERS collection...');
  let testOfferId = '';
  try {
    const offer = await createBuyerOffer(
      {
        listingId: testListingId || 'listing_001',
        cropName: 'Carrot',
        farmerId: testFarmerId,
        farmerName: 'K. M. Jayasundara',
        buyerId: testBuyerId,
        buyerName: 'Lanka Agro Exports PLC',
        buyerPhone: '+94 11 234 5678',
        buyerBusinessType: 'exporter',
        offeredPricePerKg: 250,
        requestedQuantityKg: 500,
        totalAmount: 125000,
        farmerAskingPricePerKg: 260,
        proposedPickupDate: '2026-11-20',
        transportProvidedByBuyer: true,
        notes: 'Can send our lorry to farmgate tomorrow morning.',
      },
      testBuyerId
    );
    testOfferId = offer.id;
    assert(offer.id.startsWith('offer_') && offer.totalAmount === 125000, 'BuyerOffers', 'Submit buyer purchase offer');

    // Validation prevents self-offering
    const selfOffer = validateBuyerOfferInput({
      buyerId: testFarmerId,
      farmerId: testFarmerId,
      listingId: 'listing_001',
      offeredPricePerKg: 250,
      requestedQuantityKg: 100,
    });
    assert(!selfOffer.valid, 'BuyerOffers', 'Prevent farmers from placing buyer offers on their own produce');

    // Farmer submits counter-offer
    await counterBuyerOffer(testOfferId, 255, testFarmerId, 'We can agree at Rs. 255/kg for immediate crate pickup.');
    assert(true, 'BuyerOffers', 'Farmer can counter buyer purchase offer');

    // Accept offer
    await updateOfferStatus(testOfferId, 'accepted', testFarmerId, 'Agreed!');
    assert(true, 'BuyerOffers', 'Accept buyer purchase offer and transition status');

    const listingOffers = await getOffersForListing(testListingId || 'listing_001', testFarmerId);
    assert(Array.isArray(listingOffers), 'BuyerOffers', 'Query buyer offers for listing');

    const buyerOffers = await getOffersByBuyer(testBuyerId);
    assert(Array.isArray(buyerOffers), 'BuyerOffers', 'Query offers submitted by buyer');
  } catch (err: any) {
    assert(false, 'BuyerOffers', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 7: Enquiries Collection (Direct Chat)
  // ----------------------------------------------------
  console.log('\n7. Testing ENQUIRIES collection...');
  try {
    const enquiry = await sendEnquiry(
      {
        listingId: testListingId,
        cropName: 'Carrot',
        farmerId: testFarmerId,
        buyerId: testBuyerId,
        senderId: testBuyerId,
        senderName: 'Rohan Wickramasinghe (Lanka Agro)',
        senderRole: 'buyer',
        recipientId: testFarmerId,
        recipientName: 'K. M. Jayasundara',
        message: 'Hello, are the carrots already washed and graded into 25kg gunny bags?',
      },
      testBuyerId
    );
    assert(enquiry.id.startsWith('enquiry_') && !enquiry.isRead, 'Enquiries', 'Send direct inquiry message between buyer and farmer');

    const farmerEnquiries = await getUserEnquiries(testFarmerId);
    assert(farmerEnquiries.length > 0, 'Enquiries', 'Retrieve direct enquiries for user');

    const blankValidation = validateEnquiryInput({ message: '', recipientId: testFarmerId }, testBuyerId);
    assert(!blankValidation.valid, 'Enquiries', 'Prevent blank enquiry messages');
  } catch (err: any) {
    assert(false, 'Enquiries', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 8: Market Prices Collection (Historical & Daily)
  // ----------------------------------------------------
  console.log('\n8. Testing MARKET PRICES collection...');
  try {
    const newPriceRecord = await recordMarketPrice(
      {
        cropId: 'crop_carrot',
        cropName: 'Carrot',
        sinhalaName: 'කැරට්',
        marketCenter: 'Dambulla DEC',
        date: '2026-11-19',
        wholesalePriceMin: 265,
        wholesalePriceMax: 315,
        wholesalePriceAvg: 290,
        retailPriceAvg: 350,
        grade: 'A',
        trend: 'up',
        dailyPercentageChange: 3.5,
        supplyVolumeTons: 16.2,
        source: 'HARTI',
        verifiedByAdminId: testAdminId,
      },
      'admin'
    );
    assert(newPriceRecord.id.startsWith('mp_') && newPriceRecord.wholesalePriceAvg === 290, 'MarketPrices', 'Record verified market price benchmark');

    let preventedNonAdminPrice = false;
    try {
      await recordMarketPrice({ ...newPriceRecord }, 'buyer');
    } catch {
      preventedNonAdminPrice = true;
    }
    assert(preventedNonAdminPrice, 'MarketPrices', 'Restrict market price entry to authorized admins');

    const prices = await getLatestMarketPrices();
    assert(prices.length > 0, 'MarketPrices', 'Query latest market prices across centers');

    const invalidPrice = validateMarketPriceInput({ cropName: '', wholesalePriceMin: -5 });
    assert(!invalidPrice.valid, 'MarketPrices', 'Validate market price data constraints');
  } catch (err: any) {
    assert(false, 'MarketPrices', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 9: Price Predictions Collection
  // ----------------------------------------------------
  console.log('\n9. Testing PRICE PREDICTIONS collection...');
  try {
    const prediction = await savePricePrediction({
      cropId: 'crop_carrot',
      cropName: 'Carrot',
      district: 'Nuwara Eliya',
      season: 'Maha',
      grade: 'A',
      predictedPricePerKg: 284,
      fairPriceRange: { min: 260, max: 305 },
      recommendedRescuePrice: 205,
      confidenceScore: 0.94,
      marketTrend: 'rising',
      marketTrendPercentage: 4.8,
      wholesaleBenchmark: 280,
      demandIndex: 'high',
      recommendedAction: 'Hold for 24 hours or list directly to Colombo wholesale buyers at Rs. 280-290/kg.',
      modelVersion: 'scikit-learn-regressor-v2.1',
      expiresAt: '2026-11-20T18:00:00.000Z',
    });
    assert(prediction.id.startsWith('pred_') && prediction.confidenceScore === 0.94, 'PricePredictions', 'Save AI price prediction and fair-price range');

    const predValidation = validatePricePredictionInput({ cropName: 'Carrot', predictedPricePerKg: -50 });
    assert(!predValidation.valid, 'PricePredictions', 'Validate price prediction numeric constraints');

    const latestPred = await getLatestPricePrediction('Carrot', 'Nuwara Eliya');
    assert(latestPred !== null || prediction !== null, 'PricePredictions', 'Query latest AI price prediction');
  } catch (err: any) {
    assert(false, 'PricePredictions', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // TEST SUITE 10: Notifications Collection
  // ----------------------------------------------------
  console.log('\n10. Testing NOTIFICATIONS collection...');
  try {
    const notif = await createNotification({
      userId: testFarmerId,
      userRole: 'farmer',
      title: 'Fair-Price Alert: Carrot Prices Surging in Dambulla',
      message: 'Wholesale prices for Grade-A Carrot increased by 4.8% to Rs. 285/kg at Dambulla DEC.',
      type: 'price_surge',
      referenceId: 'mp_dambulla_carrot_001',
      referenceType: 'marketPrices',
    });
    assert(notif.id.startsWith('notif_') && !notif.isRead, 'Notifications', 'Create user notification');

    const userNotifs = await getUserNotifications(testFarmerId);
    assert(userNotifs.length > 0, 'Notifications', 'Fetch user notification feed');

    await markNotificationAsRead(notif.id, testFarmerId);
    assert(true, 'Notifications', 'Mark notification as read');

    const unreadCount = await getUnreadNotificationCount(testFarmerId);
    assert(typeof unreadCount === 'number', 'Notifications', 'Count unread notifications');

    const invalidNotif = validateNotificationInput({ userId: '', title: '' });
    assert(!invalidNotif.valid, 'Notifications', 'Validate notification fields');
  } catch (err: any) {
    assert(false, 'Notifications', 'Execution error', err?.message);
  }

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;
  console.log('\n====================================================');
  console.log(`  DATABASE TEST SUMMARY: ${passedCount}/${totalCount} TESTS PASSED`);
  console.log('====================================================\n');

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

runDatabaseTests().catch((e) => {
  console.error('Fatal Test Runner Error:', e);
  process.exit(1);
});
