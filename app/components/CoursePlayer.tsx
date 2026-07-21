"use client";

import { useState } from "react";
import { COURSE, Video, Topic } from "../data/courseData";

interface CoursePlayerProps {
  isPurchased: boolean;
  onBuy: () => void;
  onClose: () => void;
  isProcessing?: boolean;
}

export default function CoursePlayer({ isPurchased, onBuy, onClose, isProcessing = false }: CoursePlayerProps) {
  const [activeVideo, setActiveVideo] = useState<Video>(COURSE.topics[0].videos[0]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([COURSE.topics[0].id]);

  function toggleTopic(id: string) {
    setExpandedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function handleVideoClick(video: Video) {
    if (!video.locked || isPurchased) {
      setActiveVideo(video);
    }
  }

  const totalVideos = COURSE.topics.reduce((a, t) => a + t.videos.length, 0);
  const unlockedCount = isPurchased
    ? totalVideos
    : COURSE.topics.reduce((a, t) => a + t.videos.filter((v) => !v.locked).length, 0);

  return (
    <div className="cp-wrapper">
      {/* Top Bar */}
      <div className="cp-topbar">
        <button className="cp-back" onClick={onClose}>
          <i className="fas fa-arrow-left" /> Back
        </button>
        <div className="cp-topbar-title">
          <span className="cp-topbar-course">{COURSE.title}</span>
        </div>
        {!isPurchased && (
          <button className="cp-buy-pill" onClick={onBuy} disabled={isProcessing}>
            <i className="fas fa-unlock-alt" />
            {isProcessing ? "Processing…" : `Buy to Unlock All · ${COURSE.price}`}
          </button>
        )}
        {isPurchased && (
          <span className="cp-unlocked-badge">
            <i className="fas fa-check-circle" /> Full Access
          </span>
        )}
      </div>

      <div className="cp-body">
        {/* ── SIDEBAR ── */}
        <aside className="cp-sidebar">
          <div className="cp-sidebar-header">
            <h3 className="cp-sidebar-title">Course Content</h3>
            <span className="cp-sidebar-count">{unlockedCount}/{totalVideos} unlocked</span>
          </div>

          <div className="cp-topics">
            {COURSE.topics.map((topic: Topic, topicIdx: number) => {
              const isExpanded = expandedTopics.includes(topic.id);
              const topicUnlocked = isPurchased
                ? topic.videos.length
                : topic.videos.filter((v) => !v.locked).length;

              return (
                <div key={topic.id} className="cp-topic">
                  <button
                    className="cp-topic-header"
                    onClick={() => toggleTopic(topic.id)}
                  >
                    <div className="cp-topic-left">
                      <span className="cp-topic-index">
                        {String(topicIdx + 1).padStart(2, "0")}
                      </span>
                      <span className="cp-topic-name">{topic.title}</span>
                    </div>
                    <div className="cp-topic-right">
                      <span className="cp-topic-meta">
                        {topicUnlocked}/{topic.videos.length}
                      </span>
                      <i className={`fas fa-chevron-${isExpanded ? "up" : "down"} cp-topic-chevron`} />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="cp-videos">
                      {topic.videos.map((video: Video, vidIdx: number) => {
                        const isLocked = video.locked && !isPurchased;
                        const isActive = activeVideo.id === video.id;

                        return (
                          <button
                            key={video.id}
                            className={`cp-video-item ${isActive ? "cp-video-item--active" : ""} ${isLocked ? "cp-video-item--locked" : ""}`}
                            onClick={() => handleVideoClick(video)}
                          >
                            {/* Thumbnail */}
                            <div
                              className="cp-video-thumb"
                              style={{ background: video.thumbnail }}
                            >
                              {isLocked ? (
                                <div className="cp-video-lock">
                                  <i className="fas fa-lock" />
                                </div>
                              ) : (
                                <div className="cp-video-play">
                                  <i className={`fas fa-${isActive ? "pause" : "play"}`} />
                                </div>
                              )}
                              {isLocked && <div className="cp-video-blur-overlay" />}
                            </div>

                            {/* Meta */}
                            <div className="cp-video-meta">
                              <span className="cp-video-num">
                                {String(vidIdx + 1).padStart(2, "0")}
                              </span>
                              <span className="cp-video-title">{video.title}</span>
                              <span className="cp-video-duration">{video.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── MAIN PLAYER AREA ── */}
        <main className="cp-main">
          {/* Video Player */}
          <div className="cp-player">
            <div
              className="cp-player-screen"
              style={{ background: activeVideo.thumbnail }}
            >
              {/* Play button in center */}
              <div className="cp-player-play">
                <i className="fas fa-play" />
              </div>

              {/* Locked overlay */}
              {activeVideo.locked && !isPurchased && (
                <div className="cp-player-locked">
                  <div className="cp-player-locked-inner">
                    <div className="cp-player-locked-icon">
                      <i className="fas fa-lock" />
                    </div>
                    <h3>This video is locked</h3>
                    <p>Purchase the course to unlock all {totalVideos} videos</p>
                    <button className="cp-player-unlock-btn" onClick={onBuy} disabled={isProcessing}>
                      <i className="fas fa-unlock-alt" />
                      {isProcessing ? "Processing…" : `Unlock Full Course · ${COURSE.price}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video info below player */}
          <div className="cp-info">
            <div className="cp-info-top">
              <h2 className="cp-info-title">{activeVideo.title}</h2>
              <span className="cp-info-duration">
                <i className="fas fa-clock" /> {activeVideo.duration}
              </span>
            </div>
            <p className="cp-info-desc">
              {activeVideo.locked && !isPurchased
                ? "Purchase the course to access this video and all other premium content."
                : "This video is unlocked. Watch to learn more about " + activeVideo.title.toLowerCase() + "."}
            </p>
          </div>

          {/* Locked banner if not purchased */}
          {!isPurchased && (
            <div className="cp-locked-banner">
              <div className="cp-locked-banner-left">
                <i className="fas fa-lock cp-locked-banner-icon" />
                <div>
                  <strong>{totalVideos - unlockedCount} videos locked</strong>
                  <span>Get full access to all topics and videos</span>
                </div>
              </div>
              <button className="cp-locked-banner-btn" onClick={onBuy} disabled={isProcessing}>
                {isProcessing ? "Processing…" : `Buy Now · ${COURSE.price}`}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
