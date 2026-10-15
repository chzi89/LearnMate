"use client";

import { useEffect } from "react";

export default function ClientInteractions() {
  useEffect(() => {
    const voiceButton = document.getElementById("voice-btn");
    const handleVoiceClick = () => {
      voiceButton.classList.toggle("text-error");
      const icon = voiceButton.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.textContent = icon.textContent === "mic" ? "mic_active" : "mic";
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        document.getElementById("tutor-prompt-input")?.focus();
      }
    };

    voiceButton?.addEventListener("click", handleVoiceClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      voiceButton?.removeEventListener("click", handleVoiceClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
