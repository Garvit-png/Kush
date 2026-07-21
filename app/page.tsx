"use client";

import { useState } from "react";
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
  const [view, setView] = useState<View>("landing");
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { initPayment } = useRazorpay();

  async function handleBuy() {
    setIsProcessing(true);
    await initPayment({
      onSuccess: (paymentId) => {
        console.log("Payment successful:", paymentId);
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

      {/* Course thumbnail modal */}
      {view === "modal" && (
        <CourseModal
          onExplore={() => setView("player")}
          onBuy={handleBuy}
          onClose={() => setView("landing")}
          isProcessing={isProcessing}
        />
      )}

      {/* Full course player */}
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
