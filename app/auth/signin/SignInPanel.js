"use client";

import { signIn, signOut, useSession } from "next-auth/react";

function SignInActions() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="auth-status" role="status">
        Checking your session…
      </p>
    );
  }

  if (session) {
    return (
      <button
        type="button"
        onClick={() => signOut()}
        className="auth-button secondary"
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="auth-button"
    >
      <span className="google-icon" aria-hidden="true">
        G
      </span>
      Sign in with Google
    </button>
  );
}

export default function SignInPanel({ authConfigured }) {
  return (
    <main className="auth-container">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="brand-mark" aria-hidden="true">
          ✦
        </div>
        <h1 id="auth-title">Welcome to LearnMate</h1>
        <p>Your AI-powered learning companion.</p>

        {authConfigured ? (
          <SignInActions />
        ) : (
          <div className="auth-setup-message" role="status">
            <strong>Sign-in is not configured yet.</strong>
            <span>
              Add NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, and
              GOOGLE_CLIENT_SECRET to the server environment, then restart the
              app.
            </span>
          </div>
        )}
      </section>

      <style jsx>{`
        .auth-container {
          display: grid;
          min-height: 100vh;
          place-items: center;
          padding: 24px;
          background: #f8f9ff;
          font-family: inherit;
        }
        .auth-card {
          width: min(100%, 400px);
          padding: clamp(28px, 8vw, 48px);
          border: 1px solid #e7eaf2;
          border-radius: 28px;
          background: #fff;
          box-shadow: 0 20px 48px rgba(25, 36, 72, 0.1);
          text-align: center;
        }
        .brand-mark {
          margin-bottom: 16px;
          color: #4f46e5;
          font-size: 42px;
        }
        h1 {
          margin: 0;
          color: #17223a;
          font-size: 26px;
          letter-spacing: -0.04em;
        }
        .auth-card > p {
          margin: 10px 0 26px;
          color: #64748b;
          line-height: 1.6;
        }
        .auth-button {
          display: flex;
          width: 100%;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          border-radius: 14px;
          background: #4f46e5;
          color: white;
          font: inherit;
          font-weight: 650;
          cursor: pointer;
          transition:
            background-color 160ms ease,
            transform 160ms ease;
        }
        .auth-button:hover {
          transform: translateY(-1px);
          background: #4338ca;
        }
        .auth-button:focus-visible {
          outline: 3px solid #a5b4fc;
          outline-offset: 3px;
        }
        .auth-button.secondary {
          background: #e8eaf0;
          color: #263247;
        }
        .google-icon {
          display: grid;
          width: 22px;
          height: 22px;
          place-items: center;
          border-radius: 50%;
          background: white;
          color: #4285f4;
          font-size: 13px;
          font-weight: 750;
        }
        .auth-setup-message {
          display: grid;
          gap: 8px;
          padding: 14px;
          border: 1px solid #f2dba3;
          border-radius: 12px;
          background: #fffbeb;
          color: #854d0e;
          font-size: 13px;
          line-height: 1.6;
          text-align: left;
        }
        .auth-status {
          color: #64748b;
          font-size: 14px;
        }
        @media (prefers-reduced-motion: reduce) {
          .auth-button {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
