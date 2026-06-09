import dash from "../assets/dashboard-icon.png";
import foods from "../assets/foods-icon.png";
import heart from "../assets/wishlist.png";
import money from "../assets/money-icon.png";
import order from "../assets/orderList-icon.png";
import rooms from "../assets/bed.png";
import G_Letter from "../assets/gold.png";

import { useState, useEffect, useRef } from "react";
import { useLoading } from "../service/LoadingProvider";

export const useMainPage = ({ useAuthentication }) => {
  const { user, setUser, setAuthorized } = useAuthentication;

  const { showLoading, hideLoading } = useLoading();

  const menuItems = [
    { href: "#dashboard", img: dash, label: "Dashboard" },
    { href: "#foods", img: foods, label: "Foods" },
    { href: "#review", img: heart, label: "Reviews" },
    { href: "#orderList", img: order, label: "Order Lists" },
    { href: "#invoice", img: money, label: "Invoice" },
    { href: "#guest", img: rooms, label: "Guest" },
    { href: "#subcription", img: G_Letter, label: "Subcription" },
  ];

  const initial = user ? user.name.charAt(0).toUpperCase() : "?";

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [link, setLink] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [activeLink, setActiveLink] = useState("#dashboard");
  const [refreshTick, setRefreshTick] = useState(0);

  // Auto-refresh every 30 seconds
  const refreshTimerRef = useRef(null);
  useEffect(() => {
    refreshTimerRef.current = setInterval(() => {
      setRefreshTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(refreshTimerRef.current);
  }, []);

  const handleManualRefresh = () => {
    setRefreshTick((t) => t + 1);
  };

  const handleMenu = (href) => {
    setActiveLink(href);
  };

  const logout = async (authControl) => {
    await authControl.logout();
    setUser(null);
    setAuthorized(false);
  };

  const getQRCode = () => {
    showLoading("Creating QR code...");
    setTimeout(() => {
      const guestBaseUrl =
        import.meta.env.VITE_GUEST_URL ||
        window.location.origin;

      const cleanBaseUrl = guestBaseUrl.replace(/\/$/, "");
      const url = `${cleanBaseUrl}/guest/home/${user.id}`;

      setLink(url);
      hideLoading();
      setShowQR(true);
    }, 700);
  };

  return {
    initial,
    showOffcanvas,
    menuItems,
    activeLink,
    showModalUser,
    showQR,
    link,
    refreshTick,
    getQRCode,
    setShowQR,
    setShowOffcanvas,
    setShowModalUser,
    handleMenu,
    handleManualRefresh,
    logout,
  };
};
