import { useState } from "react";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#f5f7fa] font-sans leading-relaxed text-[#1f2933] transition-colors duration-200 dark:bg-[#0b1220] dark:text-slate-100">
        <Header
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />

        <MainContent />

        <Footer />
      </div>
    </div>
  );
}

export default App;