"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPage() {
  const { data: session } = useSession();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="brand-mark">✦</div>
        <h1>Welcome to LearnMate</h1>
        <p>Your AI-powered learning companion.</p>

        {!session ? (
          <button onClick={() => signIn("google")} className="auth-button">
            <span className="google-icon">G</span> Sign in with Google
          </button>
        ) : (
          <button onClick={() => signOut()} className="auth-button secondary">
            Sign Out
          </button>
        )}
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f8f9ff;
          font-family: inherit;
        }
        .auth-card {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 400px;
          width: 90%;
        }
        .brand-mark {
          font-size: 3rem;
          color: #4f46e5;
          margin-bottom: 1rem;
        }
        h1 { font-size: 1.8rem; margin-bottom: 0.5rem; font-weight: bold; }
        p { color: #64748b; margin-bottom: 2rem; }
        .auth-button {
          width: 100%;
          padding: 1rem;
          border-radius: 1rem;
          border: none;
          background: #4f46e5;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: opacity 0.2s;
        }
        .auth-button:hover { opacity: 0.9; }
        .auth-button.secondary { background: #e0e0e0; color: #333; }
        .google-icon {
          background: white;
          color: #4285F4;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
