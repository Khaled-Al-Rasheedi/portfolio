import { useState } from "react";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#faf9f7] font-sans leading-relaxed text-[#251d1e] transition-colors duration-200 dark:bg-[#0d0c0c] dark:text-[#f4eee9]">
        <Header darkMode={darkMode} onDarkModeChange={setDarkMode} />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}

export default App;
