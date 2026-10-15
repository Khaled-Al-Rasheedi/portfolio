function Hero() {
  return (
    <section className="bg-[#2f5d8a] px-4 py-12 text-center text-white transition-colors duration-200 dark:bg-[#142945] md:py-20">
      <div className="mx-auto max-w-[45rem]">
        <p className="mb-4 text-sm font-bold tracking-[0.2em]">
          SOFTWARE DEVELOPER
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Hi, I'm Khaled.
        </h1>

        <p className="mb-8 text-lg leading-relaxed">
          A Computer Science graduate passionate about building
          web applications, backend systems, and practical
          software solutions.
        </p>

        <a
          href="#projects"
          className="inline-block rounded-[10px] bg-white px-8 py-3 font-bold text-[#1f4066] hover:bg-[#f5f7fa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Explore My Projects ↓
        </a>
      </div>
    </section>
  );
}

export default Hero;