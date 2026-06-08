import { useState } from "react";

export const useHotelPage = ({ hotelControl, openModal }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateSubscripe, setUpdateSubscripe] = useState(false);

  const handleShowSubcriptionModal = (hotelId, updation) => {
    const hotel = hotelControl.allHotelDetails.find((h) => h._id === hotelId);
    setSelectedUser(hotel);
    setUpdateSubscripe(updation);
  };

  const handleUpdateHotelSubcription = async (hotelId, planDetails) => {
    await hotelControl.updateHotelSubcription(
      hotelId,
      planDetails,
      updateSubscripe,
    );
    setSelectedUser(null);
    setUpdateSubscripe(false);
  };

  const HandleShowPlanDetails = (planDetails) => {
    openModal("Plan Details", planDetails, "plan");
  };

  return {
    selectedUser,
    updateSubscripe,
    handleShowSubcriptionModal,
    handleUpdateHotelSubcription,
    HandleShowPlanDetails,
    closeAlertment: () => setSelectedUser(null),
  };
};
