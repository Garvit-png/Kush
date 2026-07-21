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
  const { data: session } = useSession();
  const [view, setView] = useState<View>("landing");
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

  const { initPayment } = useRazorpay();

  // On login — check if user already purchased this course (any device)
  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(`/api/check-access?email=${encodeURIComponent(session.user.email)}&course_id=aesthetic-mastery`)
      .then((r) => r.json())
      .then(({ hasPurchased }) => {
        setIsPurchased(hasPurchased);
        setAccessChecked(true);
      });
  }, [session?.user?.email]);

  async function handleBuy() {
    // Must be logged in first
    if (!session?.user?.email) {
      signIn("google");
      return;
    }

    setIsProcessing(true);
    await initPayment({
      userEmail: session.user.email,
      onSuccess: () => {
        setIsPurchased(true);
        setView("player");
        setIsProcessing(false);
      },
      onFailure: () => setIsProcessing(false),
    });
    setIsProcessing(false);
  }

  return (
    <>
      <div style={{ display: view === "player" ? "none" : "block" }}>
        <Navbar />
        <Hero onStartLearning={() => setView("modal")} />
        <Stats />
        <Quote />
        <Courses />
        <Footer />
      </div>

      {view === "modal" && (
        <CourseModal
          onExplore={() => setView("player")}
          onBuy={handleBuy}
          onClose={() => setView("landing")}
          isProcessing={isProcessing}
        />
      )}

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
