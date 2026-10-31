import Hero from "./Hero.jsx";
import Projects from "./Projects.jsx";
import About from "./About.jsx";

function MainContent({ darkMode }) {
  return (
    <main id="home">
      <Hero darkMode={darkMode} />
      <Projects />
      <About />
    </main>
  );
}

export default MainContent;
