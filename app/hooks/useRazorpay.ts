"use client";

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
    const loaded = await loadScript();
    if (!loaded) {
      alert("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    // Create order on backend
    let orderId: string;
    let amount: number;
    try {
      const res = await fetch("/api/create-order", { method: "POST" });
      const data = await res.json();
      if (!data.orderId) throw new Error("Order creation failed");
      orderId = data.orderId;
      amount = data.amount;
    } catch (err) {
      console.error(err);
      alert("Could not initiate payment. Please try again.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency: "INR",
      name: "Kush Adhana",
      description: "Aesthetic Mastery — Full Course Access",
      order_id: orderId,
      theme: { color: "#111111" },
      prefill: { email: userEmail },

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
            throw new Error("Signature mismatch");
          }
        } catch (err) {
          console.error("Verification failed:", err);
          onFailure?.(err);
          alert("Payment verification failed. Contact support.");
        }
      },

      modal: {
        ondismiss: () => console.log("Razorpay modal closed"),
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  return { initPayment };
}
