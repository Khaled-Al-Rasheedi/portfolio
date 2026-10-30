function Hero() {
  return (
    <section className="bg-[#791d2d] px-4 py-14 text-center text-white transition-colors duration-200 dark:bg-[#2b1018] sm:px-6 md:py-20">
      <div className="mx-auto max-w-[48rem]">
        <p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#f2d9bd] dark:text-[#dfb66b] sm:text-sm">
          PORSCHE 911 · THROUGH THE LENS
        </p>
        <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Every curve tells a story.
        </h1>
        <p className="mx-auto mb-8 max-w-[38rem] text-base text-[#f9edef] sm:text-lg">
          A simple photography gallery celebrating the Porsche 911 —
          from timeless classics to modern performance icons.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#gallery"
            className="rounded-lg bg-white px-6 py-3 font-bold text-[#721b2a] transition-colors hover:bg-[#f7e8e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white dark:bg-[#dfb66b] dark:text-[#1c1210] dark:hover:bg-[#edcf96]"
          >
            View Gallery ↓
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white dark:border-[#dfb66b] dark:text-[#dfb66b]"
          >
            Book a Shoot
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
