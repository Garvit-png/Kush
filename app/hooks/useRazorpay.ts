"use client";

// NEXT_PUBLIC_ vars are inlined at build time — must be referenced directly
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export function useRazorpay() {
  function loadScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function initPayment({
    userEmail,
    onSuccess,
    onFailure,
  }: {
    userEmail: string;
    onSuccess: (paymentId: string) => void;
    onFailure?: (error: unknown) => void;
  }) {
    // Guard: key must be present
    if (!RAZORPAY_KEY) {
      alert("Payment configuration error. Please contact support.");
      console.error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not set");
      return;
    }

    // 1. Load Razorpay SDK
    const loaded = await loadScript();
    if (!loaded) {
      alert("Failed to load payment gateway. Check your internet connection.");
      return;
    }

    // 2. Create order on backend
    let orderId: string;
    let amount: number;
    try {
      const res = await fetch("/api/create-order", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("create-order failed:", err);
        alert("Could not initiate payment. Please try again.");
        return;
      }
      const data = await res.json();
      if (!data.orderId) throw new Error("No orderId in response");
      orderId = data.orderId;
      amount = data.amount;
    } catch (err) {
      console.error("Order creation error:", err);
      alert("Could not initiate payment. Please try again.");
      return;
    }

    // 3. Open Razorpay checkout
    const options = {
      key: RAZORPAY_KEY,
      amount,
      currency: "INR",
      name: "Kush Adhana",
      description: "Aesthetic Mastery — Full Course Access",
      order_id: orderId,
      theme: { color: "#111111" },
      prefill: { email: userEmail },

      // 4. On payment success — verify on backend
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_email: userEmail,
              course_id: "aesthetic-mastery",
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            onSuccess(response.razorpay_payment_id);
          } else {
            throw new Error("Signature verification failed");
          }
        } catch (err) {
          console.error("Verification error:", err);
          onFailure?.(err);
          alert("Payment was received but verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
        }
      },

      modal: {
        ondismiss: () => console.log("Razorpay modal dismissed by user"),
      },
    };

    const rzp = new (window as any).Razorpay(options);

    // Handle payment errors from Razorpay (e.g. card declined)
    rzp.on("payment.failed", function (response: any) {
      console.error("Razorpay payment.failed:", response.error);
      onFailure?.(response.error);
      alert(`Payment failed: ${response.error.description}`);
    });

    rzp.open();
  }

  return { initPayment };
}
