"use client";

import { useEffect } from "react";

export default function PwaRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Register the service worker once for PWA offline support.
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => {
        // Registration failures should not break the app.
        console.error("Service worker registration failed:", err);
      });
  }, []);

  return null;
}

