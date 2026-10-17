import React from 'react';

export default function ChatComposer({ 
  input, 
  setInput, 
  onSubmit, 
  onSuggestionClick, 
  suggestions, 
  typingMessageId, 
  inputRef, 
  startVoiceInput, 
  notice, 
  setNotice 
}) {
  return (
    <div className="composer-wrap">
      <div className="prompt-suggestions">
        <span>TRY ASKING</span>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={Boolean(typingMessageId)}
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Ask your tutor anything..."
          aria-label="Ask your tutor"
        />
        <div className="composer-actions">
          <button
            type="button"
            className="icon-button"
            onClick={startVoiceInput}
            aria-label="Voice input"
            title="Voice input"
          >
            <span className="tutor-icon">🎤</span>
          </button>
          <button
            type="submit"
            className="send-button"
            disabled={Boolean(typingMessageId)}
          >
            <span className="tutor-icon">➔</span>
          </button>
        </div>
      </form>
      {notice && (
        <div className="inline-notice" role="status">
          {notice}
          <button
            type="button"
            aria-label="Dismiss notice"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
