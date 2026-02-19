"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Gift,
  Truck,
  Clock,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

interface TopbarProps {
  config?: {
    shopLink: string;
    shopText: string;
    dispatchText: string;
    giftCardText: string;
    shippingText: string;
  };
  isPreview?: boolean;
  themeColor?: string;
}

const Topbar = ({
  config,
  isPreview = false,
  themeColor = "indigo",
}: TopbarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const fallbackConfig = {
    shopLink: "/shop",
    shopText: "Shop Now",
    dispatchText: "Same Day Dispatch Before 2PM",
    giftCardText: "Gift Cards Available",
    shippingText: "Free Shipping on Orders $50+",
  };

  const { shopLink, shopText, dispatchText, giftCardText, shippingText } =
    config || fallbackConfig;

  // Create announcements array for carousel
  const announcements = [
    { icon: <Clock size={16} />, text: dispatchText },
    { icon: <Gift size={16} />, text: giftCardText },
    { icon: <Truck size={16} />, text: shippingText },
  ];

  // Auto-rotate announcements
  useEffect(() => {
    if (isPreview || collapsed || isHovering) return;

    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [collapsed, isHovering, isPreview, announcements.length]);

  // Define theme colors based on themeColor prop
  const themeColors = {
    indigo: {
      bg: "bg-indigo-900",
      accent: "bg-indigo-800",
      hover: "hover:bg-indigo-700",
      text: "text-indigo-200",
      textHighlight: "text-indigo-100",
    },
    slate: {
      bg: "bg-slate-900",
      accent: "bg-slate-800",
      hover: "hover:bg-slate-700",
      text: "text-slate-200",
      textHighlight: "text-slate-100",
    },
    emerald: {
      bg: "bg-emerald-900",
      accent: "bg-emerald-800",
      hover: "hover:bg-emerald-700",
      text: "text-emerald-200",
      textHighlight: "text-emerald-100",
    },
    rose: {
      bg: "bg-rose-900",
      accent: "bg-rose-800",
      hover: "hover:bg-rose-700",
      text: "text-rose-200",
      textHighlight: "text-rose-100",
    },
    amber: {
      bg: "bg-amber-900",
      accent: "bg-amber-800",
      hover: "hover:bg-amber-700",
      text: "text-amber-200",
      textHighlight: "text-amber-100",
    },
    gray: {
      bg: "bg-gray-900",
      accent: "bg-gray-800",
      hover: "hover:bg-gray-700",
      text: "text-gray-200",
      textHighlight: "text-gray-100",
    },
  };

  // Select theme or default to indigo
  const theme =
    themeColors[themeColor as keyof typeof themeColors] || themeColors.indigo;

  return (
    <div
      className={`bg-indigo-950 text-white relative transition-all duration-300 ease-in-out ${
        collapsed ? "h-0 overflow-hidden" : isPreview ? "p-2" : "py-4 px-4"
      }`}
    >
      {/* Collapse button (only on non-preview) */}
      {!isPreview && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${theme.accent} ${theme.hover} p-1 rounded-b-lg text-white z-10 flex items-center justify-center w-6 h-6 shadow-md transition-transform duration-300`}
          aria-label={
            collapsed ? "Expand announcement bar" : "Collapse announcement bar"
          }
        >
          {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      <div className={`max-w-6xl mx-auto ${isPreview ? "text-xs" : "text-sm"}`}>
        <div
          className={`flex items-center ${
            isPreview
              ? "flex-col gap-1"
              : "flex-col sm:flex-row sm:justify-between sm:items-center"
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Shop CTA */}
          <a
            href={shopLink}
            className={`flex items-center gap-1 bg-indigo-500 font-medium hover:underline transition-colors px-3 py-1 rounded-full`}
          >
            {shopText}
            <ExternalLink size={14} />
          </a>

          {/* Announcement Carousel - Desktop */}
          <div className="hidden sm:flex items-center justify-center gap-8 py-1">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 transition-opacity duration-300 ${
                  theme.text
                } ${
                  !isPreview && index === currentAnnouncement
                    ? "opacity-100"
                    : "opacity-70"
                }`}
              >
                {announcement.icon}
                <span>{announcement.text}</span>
              </div>
            ))}
          </div>

          {/* Announcement Carousel - Mobile */}
          <div
            className="sm:hidden flex items-center justify-center py-2 relative w-full overflow-hidden"
            style={{ height: isPreview ? "auto" : "24px" }}
          >
            <div className="flex w-full justify-between items-center">
              <button
                onClick={() =>
                  setCurrentAnnouncement(
                    (prev) =>
                      (prev - 1 + announcements.length) % announcements.length
                  )
                }
                className={`${theme.text} p-1 rounded-full ${theme.hover}`}
                aria-label="Previous announcement"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex-1 overflow-hidden relative h-6">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 transform ${
                      index === currentAnnouncement
                        ? "translate-x-0 opacity-100"
                        : index < currentAnnouncement
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                    }`}
                  >
                    <span className={`flex items-center gap-2 ${theme.text}`}>
                      {announcement.icon}
                      <span className="whitespace-nowrap">
                        {announcement.text}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentAnnouncement(
                    (prev) => (prev + 1) % announcements.length
                  )
                }
                className={`${theme.text} p-1 rounded-full ${theme.hover}`}
                aria-label="Next announcement"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 py-1">
              {announcements.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentAnnouncement
                      ? `w-4 ${theme.textHighlight}`
                      : `w-1 ${theme.text} opacity-50`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
