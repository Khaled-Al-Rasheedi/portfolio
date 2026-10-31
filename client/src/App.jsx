import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // After a page refresh React starts again, so ask the API who is signed in.
  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((response) => {
        if (!response.ok) throw new Error("Session check failed");
        return response.json();
      })
      .then((data) => { if (active) setUser(data.user); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setCheckingSession(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#faf9f7] font-sans leading-relaxed text-[#251d1e] transition-colors duration-200 dark:bg-[#0d0c0c] dark:text-[#f4eee9]">
        <Header
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
          user={user}
          onAuthChange={setUser}
          checkingSession={checkingSession}
        />
        <MainContent darkMode={darkMode} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
