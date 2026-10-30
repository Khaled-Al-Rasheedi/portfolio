import { useState } from "react";
import Toggle from "./Toggle.jsx";
import AuthPanel from "./AuthPanel.jsx";

function Header({ darkMode, onDarkModeChange, user, onAuthChange, checkingSession }) {
  const [showAuth, setShowAuth] = useState(false);

  async function signOut() {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Sign out failed");
      onAuthChange(null);
    } catch {
      alert("Could not sign out. Please try again.");
    }
  }

  return (
    <header className="border-b border-[#e7dedd] bg-white dark:border-[#332629] dark:bg-[#171213]">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4 sm:px-6">
        <a href="#home" className="text-xl font-black tracking-[0.08em] text-[#791d2d] dark:text-[#dfb66b] sm:text-2xl">
          911 <span className="font-light">FRAME</span>
        </a>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[#661a29] dark:text-[#e1c38e] sm:gap-x-7">
          <li><a href="#gallery" className="hover:underline">Gallery</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          {checkingSession ? (
            <span className="text-sm text-[#625559] dark:text-[#d6c9c7]">Checking session...</span>
          ) : user ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="max-w-[12rem] truncate" title={user.email}>{user.email}</span>
              <button type="button" onClick={signOut} className="rounded-md border border-[#791d2d] px-3 py-1.5 font-semibold text-[#791d2d] dark:border-[#dfb66b] dark:text-[#dfb66b]">
                Sign out
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setShowAuth((open) => !open)} className="rounded-md bg-[#791d2d] px-3 py-1.5 text-sm font-semibold text-white dark:bg-[#b68c4a] dark:text-[#1c1210]">
              {showAuth ? "Close" : "Sign in / Sign up"}
            </button>
          )}
          <Toggle label="Dark mode" checked={darkMode} onChange={onDarkModeChange} />
        </div>
      </nav>
      {!user && showAuth && !checkingSession && (
        <AuthPanel onAuthenticated={(newUser) => { onAuthChange(newUser); setShowAuth(false); }} />
      )}
    </header>
  );
}

export default Header;
