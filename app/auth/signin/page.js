import SignInPanel from "./SignInPanel";

export const metadata = {
  title: "Sign in",
  description: "Sign in to continue to your LearnMate account.",
};

export default function AuthPage() {
  const authConfigured = Boolean(
    process.env.NEXTAUTH_URL &&
      process.env.NEXTAUTH_SECRET &&
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET,
  );

  return <SignInPanel authConfigured={authConfigured} />;
}
