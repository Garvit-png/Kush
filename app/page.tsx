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

type View = "landing" | "modal" | "player";

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [isPurchased, setIsPurchased] = useState(false);

  function handleBuy() {
    // Toggle purchase — wire real payment later
    setIsPurchased((prev) => !prev);
    setView("player");
  }

  return (
    <>
      {/* Landing page — always mounted, hidden behind player */}
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
        />
      )}

      {/* Full course player */}
      {view === "player" && (
        <CoursePlayer
          isPurchased={isPurchased}
          onBuy={handleBuy}
          onClose={() => setView("landing")}
        />
      )}
    </>
  );
}
