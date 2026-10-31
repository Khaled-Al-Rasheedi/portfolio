function Hero({ darkMode }) {
  return (
    <section className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden bg-[#791d2d] px-4 py-20 text-center text-white transition-colors duration-200 dark:bg-[#160e11] sm:px-6 md:min-h-[570px] md:py-28">
      {/* One video at a time; changing theme swaps the file and restarts playback. */}
      <video
        key={darkMode ? "dark" : "light"}
        className="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src={darkMode ? "/videos/porsche-dark.mp4" : "/videos/porsche-light.mp4"}
          type="video/mp4"
        />
      </video>

      {/* Darken the moving picture enough that the headline stays readable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#2c0a13]/65 via-[#3a0d17]/50 to-[#1f070d]/80 dark:from-black/75 dark:via-black/55 dark:to-black/85"
      />

      <div className="relative z-20 mx-auto max-w-[48rem]">
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
