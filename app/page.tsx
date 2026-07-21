"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Quote from "./components/Quote";
import Courses from "./components/Courses";
import Footer from "./components/Footer";
import CourseModal from "./components/CourseModal";
import CoursePlayer from "./components/CoursePlayer";
import { useRazorpay } from "./hooks/useRazorpay";

type View = "landing" | "modal" | "player";

export default function Home() {
  const { data: session, status } = useSession();
  const [view, setView] = useState<View>("landing");
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { initPayment } = useRazorpay();

  // When user logs in — check if they already purchased on any device
  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`/api/check-access?email=${encodeURIComponent(session.user.email)}&course_id=aesthetic-mastery`)
      .then((r) => r.json())
      .then(({ hasPurchased }) => {
        setIsPurchased(hasPurchased);
      });
  }, [session?.user?.email]);

  // "Explore Course" — login required, then opens player (locked if not purchased)
  function handleExplore() {
    if (status === "loading") return;
    if (!session?.user?.email) {
      // Save intent, redirect to Google login
      signIn("google", { callbackUrl: window.location.href });
      return;
    }
    setView("player");
  }

  // "Buy Now" — login required, then Razorpay, then unlock
  async function handleBuy() {
    if (status === "loading") return;

    // Step 1: must be logged in
    if (!session?.user?.email) {
      signIn("google", { callbackUrl: window.location.href });
      return;
    }

    // Step 2: already purchased? just open player
    if (isPurchased) {
      setView("player");
      return;
    }

    // Step 3: initiate Razorpay payment
    setIsProcessing(true);
    await initPayment({
      userEmail: session.user.email,
      onSuccess: () => {
        setIsPurchased(true);
        setView("player");
        setIsProcessing(false);
      },
      onFailure: () => {
        setIsProcessing(false);
      },
    });
    setIsProcessing(false);
  }

  return (
    <>
      {/* Landing page */}
      <div style={{ display: view === "player" ? "none" : "block" }}>
        <Navbar />
        <Hero onStartLearning={() => setView("modal")} />
        <Stats />
        <Quote />
        <Courses />
        <Footer />
      </div>

      {/* Course modal — thumbnail + CTA */}
      {view === "modal" && (
        <CourseModal
          onExplore={handleExplore}
          onBuy={handleBuy}
          onClose={() => setView("landing")}
          isProcessing={isProcessing}
        />
      )}

      {/* Course player — locked until purchased */}
      {view === "player" && (
        <CoursePlayer
          isPurchased={isPurchased}
          onBuy={handleBuy}
          onClose={() => setView("landing")}
          isProcessing={isProcessing}
        />
      )}
    </>
  );
}
