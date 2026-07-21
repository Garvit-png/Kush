"use client";

import Image from "next/image";
import { COURSE } from "../data/courseData";

interface CourseModalProps {
  onExplore: () => void;
  onBuy: () => void;
  onClose: () => void;
  isProcessing?: boolean;
}

export default function CourseModal({ onExplore, onBuy, onClose, isProcessing = false }: CourseModalProps) {
  return (
    <div className="cm-overlay" onClick={onClose}>
      <div className="cm-card" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="cm-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Thumbnail */}
        <div className="cm-thumb">
          <Image
            src={COURSE.thumbnail}
            alt={COURSE.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div className="cm-thumb-overlay" />
          <div className="cm-thumb-badge">NEW COURSE</div>
        </div>

        {/* Info */}
        <div className="cm-body">
          <h2 className="cm-title">{COURSE.title}</h2>
          <p className="cm-subtitle">{COURSE.subtitle}</p>

          <div className="cm-meta">
            <span className="cm-meta-item">
              <i className="fas fa-play-circle" />
              {COURSE.topics.reduce((a, t) => a + t.videos.length, 0)} Videos
            </span>
            <span className="cm-meta-item">
              <i className="fas fa-layer-group" />
              {COURSE.topics.length} Topics
            </span>
            <span className="cm-meta-item">
              <i className="fas fa-lock" />
              Premium
            </span>
          </div>

          <div className="cm-actions">
            <button className="cm-btn cm-btn--explore" onClick={onExplore}>
              Explore Course
              <i className="fas fa-arrow-right" />
            </button>
            <button className="cm-btn cm-btn--buy" onClick={onBuy} disabled={isProcessing}>
              {isProcessing ? "Processing…" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
