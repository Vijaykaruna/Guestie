import HotelModel from "../models/hotel.model.js";

/**
 * Checks all hotels and auto-deactivates subscriptions
 * where the deActiveDate has passed.
 */
export const checkAndDeactivateSubscriptions = async () => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Find hotels that are still marked as subscribed
    const activeHotels = await HotelModel.find({ isSubscripe: true });

    for (const hotel of activeHotels) {
      if (!hotel.subcripedHistory?.length) continue;

      // Get the latest subscription record
      const lastPlan = hotel.subcripedHistory[hotel.subcripedHistory.length - 1];

      if (!lastPlan?.deActiveDate) continue;

      // If today >= deActiveDate, deactivate
      if (today >= lastPlan.deActiveDate) {
        await HotelModel.findByIdAndUpdate(hotel._id, {
          $set: { isSubscripe: false, rooms: 5 },
          $push: {
            subcripedHistory: {
              planDetails: "Auto-Deactivated",
              activeDate: lastPlan.activeDate || today,
              deActiveDate: today,
            },
          },
        });
        console.log(`[SubscriptionCron] Auto-deactivated hotel: ${hotel.hotel} (${hotel._id})`);
      }
    }
  } catch (err) {
    console.error("[SubscriptionCron] Error:", err.message);
  }
};
