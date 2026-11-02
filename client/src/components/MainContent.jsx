import Hero from "./Hero.jsx";
import Projects from "./Projects.jsx";
import Services from "./Services.jsx";
import About from "./About.jsx";

function MainContent({ darkMode, user, checkingSession }) {
  return (
    <main id="home">
      <Hero darkMode={darkMode} />
      <Projects />
      <Services user={user} checkingSession={checkingSession} />
      <About />
    </main>
  );
}

export default MainContent;
