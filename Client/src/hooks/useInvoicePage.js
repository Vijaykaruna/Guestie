import { useEffect, useState } from "react";

export const useInvoicePage = ({ guestControl, openModal }) => {
  const [guestDetailsList, setGuestDetailsList] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const loadGuests = async () => {
    const data = await guestControl.getInvoiceGuests();
    setGuestDetailsList(data);
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const showOrderedListById = (guestId) => {
    const guest = guestDetailsList.find((g) => g._id === guestId);
    openModal("Ordered list Details", guest.orders, "order");
  };

  const showAlertPaymentStatus = (guestId) => {
    const guest = guestDetailsList.find((a) => a._id === guestId);
    if(!guest) return;
    setSelectedGuest(guest);
  };

  const markAsPaid = async (guestId) => {
    await guestControl.updatePaymentStatus(guestId);
    setSelectedGuest(null);
    loadGuests();
  };

  return {
    guestDetailsList,
    selectedGuest,
    showOrderedListById,
    showAlertPaymentStatus,
    markAsPaid,
    closePaymentModal: () => setSelectedGuest(null),
  };
};
