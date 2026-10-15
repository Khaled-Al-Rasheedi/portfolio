import Hero from "./Hero.jsx";
import Projects from "./Projects.jsx";
import About from "./About.jsx";

function MainContent() {
  return (
    <main id="home">
      <Hero />
      <Projects />
      <About />
    </main>
  );
}

export default MainContent;