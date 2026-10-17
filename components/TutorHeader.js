import React from 'react';

export default function TutorHeader({ tutorMode }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>My learning</span>
        <span className="breadcrumb-divider">/</span>
        <strong>AI Tutor</strong>
      </div>
      <div className="topbar-actions">
        <span className="demo-status">
          <i />{" "}
          {tutorMode === "demo"
            ? "Demo mode · sample replies"
            : tutorMode === "ai"
              ? "AI tutor · session only"
              : "Tutor ready"}
        </span>
        <button
          className="icon-button topbar-profile"
          type="button"
          aria-label="Notifications"
        >
          ♧
        </button>
      </div>
    </header>
  );
}
