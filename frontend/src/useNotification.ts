import { useEffect } from "react";
import { useUser } from "./components/UserContext";

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export function useNotification() {
  const { user } = useUser(); // get current logged-in user

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const subscribeUser = async () => {
    if (!user) {
      console.error("No logged-in user. Cannot subscribe.");
      return;
    }

    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BNAPG4FIC-DmldQWu-z0snpuoiBjesMIlYRkoPNHQDN6T55uw6gFP5DUim5-a70-UBsxg20beAH4ziG6NZZXcPs"
        ),
      });

      console.log("Subscription object:", subscription.toJSON());

      await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id, // dynamically get userId from context
          subscription: subscription.toJSON(),
        }),
      });

      console.log("Subscription sent to backend for user:", user.id);
    }
  };

  return { subscribeUser };
}
