"use client";

import { useEffect, useRef, useState } from "react";
import "./app.css";

const suggestions = [
  "Explain photosynthesis simply",
  "Give me a quick quiz",
  "Use a real-life example",
];

const answers = {
  photosynthesis: {
    title: "Photosynthesis, made simple",
    text: "Think of a leaf as a tiny solar-powered kitchen. Chlorophyll captures sunlight, and the plant uses that energy to turn water and carbon dioxide into glucose. Oxygen is released along the way.",
    takeaway: "Sunlight + water + carbon dioxide → glucose + oxygen",
  },
  fractions: {
    title: "Fractions, made simple",
    text: "A fraction shows a part of a whole that has been split into equal pieces. The bottom number tells you how many equal pieces there are; the top number tells you how many of those pieces you have.",
    takeaway: "In 3/8, the whole is split into 8 equal parts and you have 3.",
  },
  quiz: {
    title: "Quick quiz strategy",
    text: "Read the question carefully before looking at the choices. Identify the idea being tested, cross out answers that cannot be right, then explain to yourself why your final choice fits.",
    takeaway:
      "Understand the idea first. Use the choices to check your thinking.",
  },
};

const starterMessages = [
  {
    id: "welcome",
    role: "assistant",
    title: "Your personal study space",
    text: "Hi there! I’m your LearnMate tutor. Ask me about a topic, share what feels confusing, or pick one of the prompts below. We’ll work through it one step at a time.",
    takeaway: "Small steps add up. Let’s make this click.",
  },
];

const quizzesBySubject = {
  Biology: {
    question:
      "Which part of a plant cell captures sunlight for photosynthesis?",
    options: ["Mitochondria", "Chloroplast", "Ribosome", "Vacuole"],
    answer: "Chloroplast",
    explanation: "Chloroplasts contain chlorophyll, which absorbs light.",
  },
  Mathematics: {
    question: "What is 6/8 in its simplest form?",
    options: ["1/2", "2/3", "3/4", "5/4"],
    answer: "3/4",
    explanation: "Divide the numerator and denominator by 2: 6/8 = 3/4.",
  },
  Physics: {
    question: "Which unit is used to measure electric current?",
    options: ["Volt", "Ampere", "Watt", "Ohm"],
    answer: "Ampere",
    explanation: "Electric current is measured in amperes (A).",
  },
  English: {
    question: "Which word is a verb?",
    options: ["Blue", "Quickly", "Run", "Kindness"],
    answer: "Run",
    explanation: "A verb describes an action. “Run” is an action word.",
  },
};

function getTutorAnswer(prompt, explanationStyle) {
  const value = prompt.toLowerCase();

  let response;
  if (value.includes("fraction")) {
    response = answers.fractions;
  } else if (value.includes("quiz") || value.includes("question")) {
    response = answers.quiz;
  } else if (
    value.includes("photo") ||
    value.includes("plant") ||
    value.includes("biology")
  ) {
    response = answers.photosynthesis;
  } else {
    response = {
      title: `Let’s explore ${prompt.length > 46 ? "that idea" : prompt}`,
      text: `Let’s make this easier to understand. Start with the core idea: ${prompt.replace(/[?.!]+$/, "")}. Now connect that idea to something familiar, and break it into one small step at a time. What part would you like to unpack first?`,
      takeaway: "Understand the idea first, then practise using it.",
    };
  }

  if (explanationStyle === "Analogy") {
    return {
      ...response,
      text: `${response.text} Try picturing it as a familiar everyday process to help the idea stick.`,
      takeaway:
        "Make a connection between this new idea and something familiar.",
    };
  }

  if (explanationStyle === "Exam prep") {
    return {
      ...response,
      text: `${response.text} For exam prep, practise defining the key term and explaining the steps in order.`,
      takeaway: "Exam focus: define the idea, then explain the steps in order.",
    };
  }

  return response;
}

function Icon({ children, className = "" }) {
  return (
    <span aria-hidden="true" className={`tutor-icon ${className}`}>
      {children}
    </span>
  );
}

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState("Tutor");
  const [subject, setSubject] = useState("Biology");
  const [grade, setGrade] = useState("Grade 9");
  const [style, setStyle] = useState("Guided");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [notice, setNotice] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const messageSequence = useRef(0);

  const typingMessage = messages.find(
    (message) => message.id === typingMessageId,
  );
  const currentQuiz = quizzesBySubject[subject];

  useEffect(() => {
    if (!typingMessage) return undefined;

    let characterIndex = 0;
    const interval = window.setInterval(() => {
      characterIndex += 2;
      setTypedCharacters(Math.min(characterIndex, typingMessage.text.length));
      if (characterIndex >= typingMessage.text.length) {
        window.clearInterval(interval);
        setTypingMessageId(null);
      }
    }, 17);

    return () => window.clearInterval(interval);
  }, [typingMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typedCharacters]);

  useEffect(() => {
    function focusComposer(event) {
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusComposer);
    return () => window.removeEventListener("keydown", focusComposer);
  }, []);

  async function sendPrompt(value = input) {
    const prompt = value.trim();

    if (!prompt || typingMessageId) return;

    messageSequence.current += 1;

    const questionId = `question-${messageSequence.current}`;
    const assistantId = `reply-${messageSequence.current}`;

    setMessages((current) => [
      ...current,
      {
        id: questionId,
        role: "user",
        text: prompt,
      },
    ]);

    setInput("");
    setNotice("");
    setTypedCharacters(0);
    setTypingMessageId("loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `You are tutoring a ${grade} student in ${subject}.
Explanation style: ${style}.
Student's question: ${prompt}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI se jawab nahi mila.");
      }

      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          title: "Let's understand it together",
          text: data.answer,
          takeaway: "",
        },
      ]);

      setTypedCharacters(0);
      setTypingMessageId(assistantId);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          title: "AI Tutor Error",
          text: error.message || "AI se rabta nahi ho saka.",
          takeaway: "",
        },
      ]);

      setTypingMessageId(null);
    }
  }

  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setNotice(
        "Voice input isn’t available in this browser. You can type your question instead.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setIsListening(false);
      inputRef.current?.focus();
    };
    recognition.onerror = () => {
      setIsListening(false);
      setNotice(
        "We couldn’t hear that clearly. Try again or type your question.",
      );
    };
    recognition.onend = () => setIsListening(false);
    setNotice("");
    setIsListening(true);
    recognition.start();
  }

  function readLatestAnswer() {
    const latestAnswer = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!latestAnswer || !window.speechSynthesis) {
      setNotice("Read aloud isn’t available in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(latestAnswer.text),
    );
  }

  async function copyLatestAnswer() {
    const latestAnswer = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!latestAnswer || !navigator.clipboard) {
      setNotice(
        "Copy isn’t available in this browser. You can select the answer text and copy it manually.",
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(latestAnswer.text);
      setNotice("Tutor answer copied to your clipboard.");
    } catch {
      setNotice(
        "We couldn’t copy the answer. Select the text and copy it manually.",
      );
    }
  }

  function resetChat() {
    window.speechSynthesis?.cancel();
    setMessages(starterMessages);
    setTypingMessageId(null);
    setTypedCharacters(0);
    setQuizAnswer("");
    setQuizChecked(false);
    setNotice("A fresh tutoring session is ready.");
  }

  function handleSuggestion(suggestion) {
    if (suggestion.includes("quiz")) {
      sendPrompt("Give me a quick quiz about photosynthesis");
      return;
    }
    sendPrompt(suggestion);
  }

  return (
    <main className="tutor-app">
      <aside className="tutor-sidebar">
        <a className="brand" href="/dashboard" aria-label="LearnMate home">
          <span className="brand-mark">
            <Icon>✦</Icon>
          </span>
          <span>
            learnmate<span className="brand-ai">.ai</span>
          </span>
        </a>

        <div className="student-card">
          <div className="student-avatar">A</div>
          <div className="student-info">
            <strong>Alex Morgan</strong>
            <span>{grade} learner</span>
          </div>
          <button
            className="icon-button student-menu"
            type="button"
            aria-label="Student profile"
          >
            ⌄
          </button>
        </div>

        <p className="sidebar-label">YOUR WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {[
            ["Tutor", "✧"],
            ["My learning", "▤"],
            ["Practice", "◉"],
            ["Progress", "↗"],
          ].map(([label, icon]) => (
            <button
              key={label}
              className={`nav-item ${activeSection === label ? "nav-item-active" : ""}`}
              type="button"
              onClick={() => {
                setActiveSection(label);
                if (label !== "Tutor")
                  setNotice(
                    `${label} is part of your learning space. Keep exploring here with your tutor.`,
                  );
              }}
            >
              <Icon>{icon}</Icon>
              <span>{label}</span>
              {label === "Practice" && <span className="nav-badge">1</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <span className="streak-icon">✦</span>
            <div>
              <strong>6 day streak</strong>
              <span>You’re on a roll!</span>
            </div>
            <span className="streak-spark">✦</span>
          </div>
          <div className="privacy-note">
            <Icon>◈</Icon>
            <span>Your learning stays yours.</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <span>My learning</span>
            <span className="breadcrumb-divider">/</span>
            <strong>AI Tutor</strong>
          </div>
          <div className="topbar-actions">
            <span className="demo-status">
              <i /> Interactive demo
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

        <div className="workspace-content">
          <section className="lesson-heading">
            <div>
              <p className="eyebrow">YOUR PERSONAL LEARNING SPACE</p>
              <h1>
                Let’s make learning <span>click.</span>
              </h1>
              <p className="heading-subtitle">
                Curious about something? Your tutor is here to help you figure
                it out.
              </p>
            </div>
            <div className="session-pills">
              <label className="select-pill">
                <Icon>▧</Icon>
                <select
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  aria-label="Choose subject"
                >
                  <option>Biology</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>English</option>
                </select>
                <span className="select-caret">⌄</span>
              </label>
              <label className="select-pill grade-pill">
                <Icon>♙</Icon>
                <select
                  value={grade}
                  onChange={(event) => setGrade(event.target.value)}
                  aria-label="Choose grade"
                >
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                  <option>Grade 12</option>
                </select>
                <span className="select-caret">⌄</span>
              </label>
            </div>
          </section>

          <div className="learning-layout">
            <section className="chat-panel" aria-label="AI Tutor conversation">
              <div className="chat-header">
                <div className="tutor-avatar">
                  <Icon>✦</Icon>
                  <i />
                </div>
                <div className="chat-header-copy">
                  <strong>Your AI tutor</strong>
                  <span>
                    <i /> Ready when you are
                  </span>
                </div>
                <div className="chat-tools">
                  <button
                    className="icon-button"
                    type="button"
                    onClick={readLatestAnswer}
                    aria-label="Read latest answer aloud"
                    title="Read aloud"
                  >
                    <Icon>◖</Icon>
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={resetChat}
                    aria-label="Start a new chat"
                    title="New conversation"
                  >
                    <Icon>↻</Icon>
                  </button>
                </div>
              </div>

              <div className="conversation" aria-live="polite">
                <div className="conversation-date">
                  <span />
                  TODAY
                  <span />
                </div>
                {messages.map((message) => {
                  const visibleText =
                    message.id === typingMessageId
                      ? message.text.slice(0, typedCharacters)
                      : message.text;

                  return (
                    <article
                      className={`message message-${message.role}`}
                      key={message.id}
                    >
                      {message.role === "assistant" ? (
                        <div className="message-avatar">
                          <Icon>✦</Icon>
                        </div>
                      ) : (
                        <div className="user-avatar">A</div>
                      )}
                      <div className="message-body">
                        <div className="message-meta">
                          <strong>
                            {message.role === "assistant" ? "LearnMate" : "You"}
                          </strong>
                          <span>
                            {message.role === "assistant"
                              ? "Tutor"
                              : "Just now"}
                          </span>
                        </div>
                        <div
                          className={`message-bubble ${message.role === "assistant" ? "assistant-bubble" : "user-bubble"}`}
                        >
                          {message.title && <h2>{message.title}</h2>}
                          <p>
                            {visibleText}
                            {message.id === typingMessageId && (
                              <span
                                className="typing-cursor"
                                aria-label="Generating response"
                              />
                            )}
                          </p>
                          {message.takeaway &&
                            message.id !== typingMessageId && (
                              <div className="takeaway">
                                <Icon>✧</Icon>
                                <span>{message.takeaway}</span>
                              </div>
                            )}
                          {message.role === "assistant" &&
                            message.id !== "welcome" &&
                            message.id !== typingMessageId && (
                              <div className="answer-actions">
                                <button
                                  type="button"
                                  onClick={readLatestAnswer}
                                >
                                  <Icon>◖</Icon> Listen
                                </button>
                                <button
                                  type="button"
                                  onClick={copyLatestAnswer}
                                >
                                  <Icon>▢</Icon> Copy
                                </button>
                              </div>
                            )}
                        </div>
                      </div>
                    </article>
                  );
                })}
                {typingMessageId && (
                  <div className="generating">
                    <span />
                    <span />
                    <span /> Tutor is thinking
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

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

              <div className="composer-wrap">
                <div className="prompt-suggestions">
                  <span>TRY ASKING</span>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={Boolean(typingMessageId)}
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <form
                  className="composer"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendPrompt();
                  }}
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendPrompt();
                      }
                    }}
                    placeholder="Ask anything you’re learning about..."
                    rows={1}
                    aria-label="Ask your tutor a question"
                    disabled={Boolean(typingMessageId)}
                  />
                  <div className="composer-footer">
                    <div className="composer-hints">
                      <button
                        type="button"
                        className={`icon-button ${isListening ? "listening" : ""}`}
                        onClick={startVoiceInput}
                        aria-label="Use voice input"
                        title="Voice input"
                      >
                        <Icon>{isListening ? "●" : "♩"}</Icon>
                      </button>
                      <span>
                        {isListening ? (
                          "Listening…"
                        ) : (
                          <>
                            Press <kbd>/</kbd> to focus
                          </>
                        )}
                      </span>
                      <span className="mode-separator" />
                      <label className="style-select">
                        <Icon>✧</Icon>
                        <select
                          value={style}
                          onChange={(event) => setStyle(event.target.value)}
                          aria-label="Explanation style"
                        >
                          <option>Guided</option>
                          <option>Analogy</option>
                          <option>Exam prep</option>
                        </select>
                        <span>⌄</span>
                      </label>
                    </div>
                    <button
                      className="send-button"
                      type="submit"
                      disabled={!input.trim() || Boolean(typingMessageId)}
                      aria-label="Send message"
                    >
                      <span>{typingMessageId ? "Thinking" : "Ask tutor"}</span>
                      <Icon>↑</Icon>
                    </button>
                  </div>
                </form>
                <p className="composer-disclaimer">
                  LearnMate can make mistakes. Use it to support your learning,
                  not replace your own thinking.
                </p>
              </div>
            </section>

            <aside className="learning-aside">
              <section className="aside-card focus-card">
                <div className="aside-card-title">
                  <span className="aside-icon purple-icon">✧</span>
                  <div>
                    <span className="eyebrow">TODAY’S FOCUS</span>
                    <h2>{subject} spotlight</h2>
                  </div>
                </div>
                <div className="focus-topic">
                  <span className="topic-dot" />
                  {subject === "Mathematics"
                    ? "Fractions"
                    : subject === "Physics"
                      ? "Electricity"
                      : subject === "English"
                        ? "Parts of speech"
                        : "Photosynthesis"}
                  <span className="topic-level">IN PROGRESS</span>
                </div>
                <div className="progress-copy">
                  <span>Session progress</span>
                  <strong>
                    {quizChecked && quizAnswer === currentQuiz.answer
                      ? "80%"
                      : "60%"}
                  </strong>
                </div>
                <div className="progress-track">
                  <span
                    style={{
                      width:
                        quizChecked && quizAnswer === currentQuiz.answer
                          ? "80%"
                          : "60%",
                    }}
                  />
                </div>
                <p className="focus-caption">
                  You’re building a strong understanding. Keep going!
                </p>
              </section>

              <section className="aside-card mini-quiz">
                <div className="aside-card-title">
                  <span className="aside-icon blue-icon">✎</span>
                  <div>
                    <span className="eyebrow">QUICK KNOWLEDGE CHECK</span>
                    <h2>One-minute quiz</h2>
                  </div>
                </div>
                <p className="quiz-question">{currentQuiz.question}</p>
                <div className="quiz-options">
                  {currentQuiz.options.map((option) => {
                    const selected = quizAnswer === option;
                    const correct =
                      quizChecked && option === currentQuiz.answer;
                    const incorrect =
                      quizChecked && selected && option !== currentQuiz.answer;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`quiz-option ${selected ? "quiz-option-selected" : ""} ${correct ? "quiz-option-correct" : ""} ${incorrect ? "quiz-option-wrong" : ""}`}
                        onClick={() => {
                          setQuizAnswer(option);
                          setQuizChecked(false);
                        }}
                      >
                        <span className="quiz-radio">
                          {correct ? "✓" : selected ? "•" : ""}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
                {quizChecked && (
                  <p
                    className={`quiz-feedback ${quizAnswer === currentQuiz.answer ? "feedback-correct" : "feedback-wrong"}`}
                  >
                    {quizAnswer === currentQuiz.answer
                      ? `Exactly! ${currentQuiz.explanation}`
                      : `Not quite. ${currentQuiz.explanation}`}
                  </p>
                )}
                <button
                  className="quiz-submit"
                  type="button"
                  disabled={!quizAnswer}
                  onClick={() => setQuizChecked(true)}
                >
                  {quizChecked ? "Check again" : "Check my answer"}
                  <Icon>→</Icon>
                </button>
              </section>

              <section className="aside-card vocabulary-card">
                <div className="aside-card-title">
                  <span className="aside-icon mint-icon">Aa</span>
                  <div>
                    <span className="eyebrow">YOUR GLOSSARY</span>
                    <h2>Key vocabulary</h2>
                  </div>
                </div>
                <div className="vocabulary-list">
                  <div>
                    <strong>Chlorophyll</strong>
                    <span>The green pigment that absorbs light.</span>
                  </div>
                  <div>
                    <strong>Glucose</strong>
                    <span>A sugar plants make for energy.</span>
                  </div>
                  <div>
                    <strong>Carbon dioxide</strong>
                    <span>A gas plants take in from the air.</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="glossary-link"
                  onClick={() =>
                    sendPrompt("Explain the key vocabulary in photosynthesis")
                  }
                >
                  Explore these terms <span>→</span>
                </button>
              </section>

              <div className="safety-card">
                <span>✦</span>
                <p>
                  <strong>Curiosity looks good on you.</strong>
                  <br />
                  Ask questions, make mistakes, and keep learning.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
