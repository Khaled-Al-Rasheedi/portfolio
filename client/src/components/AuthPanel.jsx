import { useState } from "react";

function AuthPanel({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Authentication failed");
      setPassword("");
      onAuthenticated(data.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border-t border-[#e7dedd] bg-[#faf9f7] px-4 py-5 dark:border-[#332629] dark:bg-[#191415]">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-[38rem] flex-col gap-3">
        <h2 className="text-lg font-bold text-[#421823] dark:text-[#dfb66b]">
          {mode === "login" ? "Sign in" : "Create an account"}
        </h2>
        <label className="text-sm font-medium" htmlFor="auth-email">Email</label>
        <input id="auth-email" type="email" autoComplete="email" required maxLength={254}
          value={email} onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 rounded-md border border-[#dacac9] bg-white px-3 py-2 text-[#251d1e] dark:border-[#584247]" />
        <label className="text-sm font-medium" htmlFor="auth-password">Password</label>
        <input id="auth-password" type="password" required minLength={mode === "signup" ? 8 : 1} maxLength={72}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          value={password} onChange={(event) => setPassword(event.target.value)}
          className="min-w-0 rounded-md border border-[#dacac9] bg-white px-3 py-2 text-[#251d1e] dark:border-[#584247]" />
        {error && <p role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>}
        <button type="submit" disabled={submitting} className="rounded-md bg-[#791d2d] px-4 py-2 font-semibold text-white disabled:opacity-50 dark:bg-[#b68c4a] dark:text-[#1c1210]">
          {submitting ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
        </button>
        <button type="button" className="self-start text-sm text-[#791d2d] underline dark:text-[#dfb66b]"
          onClick={() => { setMode((value) => value === "login" ? "signup" : "login"); setError(""); }}>
          {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

export default AuthPanel;
