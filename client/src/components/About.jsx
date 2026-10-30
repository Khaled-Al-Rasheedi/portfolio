function About() {
  return (
    <section id="about" className="bg-white px-4 py-12 transition-colors duration-200 dark:bg-[#191415] sm:px-6 md:py-16">
      <div className="mx-auto max-w-[72rem]">
        <h2 className="mb-4 text-3xl font-bold text-[#421823] dark:text-[#f2d7b0]">
          About the Gallery
        </h2>
        <p className="max-w-[44rem] text-[#625559] dark:text-[#d6c9c7]">
          I'm Khaled. 911 Frame is my car-photography portfolio concept,
          celebrating the shape, details, and character of classic and modern
          Porsche 911 models.
        </p>

        <div id="contact" className="mt-8 border-t border-[#e7dedd] pt-7 dark:border-[#4a3439]">
          <h3 className="mb-2 text-xl font-bold text-[#421823] dark:text-[#f2d7b0]">
            Have a car in mind?
          </h3>
          <p className="mb-4 text-sm text-[#625559] dark:text-[#d6c9c7]">
            Get in touch about a shoot or a collaboration.
          </p>
          <a
            href="mailto:YOUR_EMAIL@example.com?subject=Porsche%20911%20Photography%20Booking"
            className="inline-block rounded-lg bg-[#791d2d] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#571320] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#791d2d] dark:bg-[#b68c4a] dark:text-[#1c1210] dark:hover:bg-[#d0a75f]"
          >
            Book a Shoot ↗
          </a>
          <p className="mt-2 text-xs text-[#86777a] dark:text-[#c0aaa7]">
            Replace YOUR_EMAIL@example.com with your real contact email before publishing.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
