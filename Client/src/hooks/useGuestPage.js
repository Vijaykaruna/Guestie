import { useEffect, useState } from "react";

export const useGuestPage = ({ guestControl }) => {
  const [guestDetailsList, setGuestDetailsList] = useState([]);

  const loadGuests = async () => {
    const data = await guestControl.getAllGuestDetails();
    setGuestDetailsList(data);
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  const handleUpdateStay = async (guestId) => {
    await guestControl.updateStayStatus(guestId);
    loadGuests();
  };

  const handleAddnewGuest = async (guestDetails) => {
    const success = await guestControl.addnewGuest(guestDetails);
    if (success) {
      setShowAddGuestModal(false);
      loadGuests();
    }
  };

  return {
    guestDetailsList,
    showAddGuestModal,
    handleUpdateStay,
    setShowAddGuestModal,
    handleAddnewGuest,
  };
};
