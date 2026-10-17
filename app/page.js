import Link from "next/link";
import "./home.css";

const steps = [
  {
    number: "01",
    title: "Choose what you are learning",
    description:
      "Pick a subject and grade, then ask about the idea you want to understand.",
  },
  {
    number: "02",
    title: "Learn it step by step",
    description:
      "Get a patient explanation in English or Roman Urdu, with a style that suits you.",
  },
  {
    number: "03",
    title: "Try a practice question",
    description:
      "Check your understanding with a short sample quiz in the tutor workspace.",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Link className="home-brand" href="/" aria-label="LearnMate AI home">
          <span className="home-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M16 3.5 18.9 13l9.6 3-9.6 2.9-2.9 9.6-3-9.6-9.5-2.9 9.5-3L16 3.5Z"
                fill="currentColor"
              />
              <circle cx="25.5" cy="7" r="2" fill="currentColor" />
            </svg>
          </span>
          <span className="home-brand-name">
            LearnMate<span>AI</span>
          </span>
        </Link>

        <nav className="home-nav" aria-label="Main navigation">
          <Link className="home-nav-preview" href="/dashboard">
            Preview dashboard
          </Link>
          <Link className="home-button home-button-small" href="/learn">
            Open tutor <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow">
              <span className="home-eyebrow-dot" aria-hidden="true" />
              A patient AI tutor for curious minds
            </p>
            <h1 id="home-title">
              Understand it,
              <br />
              then <span>make it stick.</span>
            </h1>
            <p className="home-intro">
              Ask a question, choose your learning level, and work through ideas
              with a patient tutor. Practise at your own pace in English or
              Roman Urdu.
            </p>

            <div className="home-hero-actions">
              <Link className="home-button" href="/learn">
                Start learning <span aria-hidden="true">→</span>
              </Link>
              <Link className="home-button home-button-secondary" href="/dashboard">
                Explore the preview
              </Link>
            </div>

            <div className="home-assurance">
              <span className="home-assurance-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="m5 10.2 3.1 3.1L15.5 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p>
                No account needed <span aria-hidden="true">·</span> Your
                progress is not saved in this preview
              </p>
              <p className="home-api-note">
                Sample replies work without a key. Add a Gemini API key for
                live AI tutoring.
              </p>
            </div>
          </div>

          <div
            className="home-visual"
            role="img"
            aria-label="Example tutor conversation for a Grade 6 mathematics question"
          >
            <div className="home-visual-orbit home-visual-orbit-one" />
            <div className="home-visual-orbit home-visual-orbit-two" />
            <div className="home-preview-card">
              <div className="home-preview-topbar">
                <div className="home-preview-brand">
                  <span className="home-preview-mark" aria-hidden="true">✦</span>
                  <span>LEARNMATE</span>
                </div>
                <span className="home-example-label">EXAMPLE</span>
              </div>
              <div className="home-preview-context">
                <span className="home-subject-icon" aria-hidden="true">∑</span>
                <span>MATHEMATICS</span>
                <span className="home-context-divider" aria-hidden="true" />
                <span>GRADE 6</span>
              </div>
              <div className="home-question">
                <span className="home-message-label">YOUR QUESTION</span>
                <p>Why is 1/4 smaller than 1/2?</p>
              </div>
              <div className="home-tutor-response">
                <div className="home-tutor-heading">
                  <span className="home-tutor-avatar" aria-hidden="true">✦</span>
                  <span>YOUR TUTOR</span>
                  <span className="home-guided-label">GUIDED</span>
                </div>
                <p>
                  Imagine two same-size pizzas. If one is cut into 2 equal
                  pieces, each piece is bigger than when it is cut into 4.
                </p>
                <div className="home-response-note">
                  <span aria-hidden="true">✧</span>
                  More equal pieces means each piece is smaller.
                </div>
              </div>
              <div className="home-preview-footer">
                <span><i aria-hidden="true" /> Step-by-step explanation</span>
                <span>English</span>
              </div>
            </div>
            <div className="home-floating-note">
              <span className="home-note-icon" aria-hidden="true">✓</span>
              <span><strong>Learn at your pace</strong><small>One idea at a time</small></span>
            </div>
            <span className="home-visual-caption">A little clarity goes a long way.</span>
          </div>
        </div>
      </section>

      <section className="home-method" aria-labelledby="home-method-title">
        <div className="home-section-heading">
          <p className="home-section-kicker">A SIMPLE LEARNING LOOP</p>
          <h2 id="home-method-title">Small steps. <span>Real understanding.</span></h2>
          <p>
            Build confidence by exploring a topic, making sense of it, and
            trying it for yourself.
          </p>
        </div>
        <div className="home-step-grid">
          {steps.map((step) => (
            <article className="home-step-card" key={step.number}>
              <span className="home-step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="home-step-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-title">
        <div className="home-cta-decoration" aria-hidden="true">✦</div>
        <div>
          <p className="home-section-kicker">YOUR NEXT QUESTION STARTS HERE</p>
          <h2 id="home-cta-title">Curiosity looks good on you.</h2>
          <p>Bring a topic you have been wondering about. We will take it one step at a time.</p>
        </div>
        <Link className="home-button home-button-light" href="/learn">
          Meet your tutor <span aria-hidden="true">→</span>
        </Link>
      </section>

      <footer className="home-footer">
        <div className="home-footer-main">
          <Link className="home-brand home-footer-brand" href="/" aria-label="LearnMate AI home">
            <span className="home-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 3.5 18.9 13l9.6 3-9.6 2.9-2.9 9.6-3-9.6-9.5-2.9 9.5-3L16 3.5Z"
                  fill="currentColor"
                />
                <circle cx="25.5" cy="7" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className="home-brand-name">LearnMate<span>AI</span></span>
          </Link>
          <p className="home-disclaimer">
            AI explanations can be incorrect. Use them to support your learning,
            and check important answers with trusted learning materials.
          </p>
          <nav className="home-footer-links" aria-label="Footer navigation">
            <Link href="/learn">Tutor</Link>
            <Link href="/dashboard">Dashboard preview</Link>
          </nav>
        </div>
        <div className="home-footer-bottom">
          <span>LearnMate AI</span>
          <span>Made for learning, one question at a time.</span>
        </div>
      </footer>
    </main>
  );
}
