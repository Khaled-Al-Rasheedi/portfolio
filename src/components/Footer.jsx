function Footer() {
  return (
    <footer className="bg-[#1f4066] px-4 py-8 text-white dark:bg-[#080f1c]">
      <div className="mx-auto flex max-w-[70rem] flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center sm:justify-between sm:text-left">
        <p>© 2026 Khaled. All rights reserved.</p>

        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <li>
            <a
              className="hover:underline focus-visible:underline"
              href="https://github.com/Khaled-Al-Rasheedi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>

          <li>
            <a
              className="hover:underline focus-visible:underline"
              href="https://www.linkedin.com/in/khaled-alrasheedi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;