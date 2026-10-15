function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[70rem] bg-white px-4 py-12 transition-colors duration-200 dark:bg-[#152238] md:py-16"
    >
      <h2 className="mb-8 text-3xl font-bold">
        About Me
      </h2>

      <div className="max-w-[50rem] space-y-4 text-[#52606d] dark:text-slate-300">
        <p>
          I'm a Computer Science graduate from King Abdulaziz
          University with an interest in full-stack development
          and software engineering.
        </p>

        <p>
          I enjoy working with different technologies, solving
          technical problems, and turning ideas into functional
          applications. My experience includes web development,
          backend APIs, database management, and collaborative
          software projects.
        </p>
      </div>

      <a
        href="https://github.com/Khaled-Al-Rasheedi"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-bold text-[#2f5d8a] hover:underline focus-visible:underline dark:text-blue-300"
      >
        Explore my GitHub →
      </a>
    </section>
  );
}

export default About;