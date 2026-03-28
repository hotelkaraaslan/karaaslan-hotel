"use client";

import { useState, useEffect } from "react";

interface CookieConsentProps {
  dict: {
    message: string;
    accept: string;
    decline: string;
    learnMore: string;
  };
  privacyUrl?: string;
}

export default function CookieConsent({ dict, privacyUrl }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Cookie icon + message */}
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl shrink-0 mt-0.5">🍪</span>
            <p className="text-sm text-gray-700 leading-relaxed">
              {dict.message}
              {privacyUrl && (
                <>
                  {" "}
                  <a
                    href={privacyUrl}
                    className="underline text-amber-700 hover:text-amber-800 font-medium"
                  >
                    {dict.learnMore}
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              {dict.decline}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors cursor-pointer"
            >
              {dict.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
