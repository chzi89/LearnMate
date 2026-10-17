import React from 'react';

export default function MessageBubble({ message, typingMessageId, typedCharacters, readLatestAnswer, copyLatestAnswer }) {
  const isAssistant = message.role === "assistant";
  const isTyping = message.id === typingMessageId;
  const visibleText = isTyping ? message.text.slice(0, typedCharacters) : message.text;

  return (
    <article className={`message message-${message.role}`}>
      {isAssistant ? (
        <div className="message-avatar"><span className="tutor-icon">✦</span></div>
      ) : (
        <div className="user-avatar">A</div>
      )}
      <div className="message-body">
        <div className="message-meta">
          <strong>{isAssistant ? "LearnMate" : "You"}</strong>
          <span>{isAssistant ? "Tutor" : "Just now"}</span>
        </div>
        <div className={`message-bubble ${isAssistant ? "assistant-bubble" : "user-bubble"}`}>
          {message.title && <h2>{message.title}</h2>}
          <p>
            {visibleText}
            {isTyping && <span className="typing-cursor" aria-label="Generating response" />}
          </p>
          {message.takeaway && !isTyping && (
            <div className="takeaway">
              <span className="tutor-icon">✧</span>
              <span>{message.takeaway}</span>
            </div>
          )}
          {isAssistant && message.id !== "welcome" && !isTyping && (
            <div className="answer-actions">
              <button type="button" onClick={readLatestAnswer}>
                <span className="tutor-icon">◖</span> Listen
              </button>
              <button type="button" onClick={copyLatestAnswer}>
                <span className="tutor-icon">▢</span> Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
