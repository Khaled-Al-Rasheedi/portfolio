import Toggle from "./Toggle.jsx";

function Header({ darkMode, onDarkModeChange }) {
  return (
    <header className="border-b border-[#d5dde5] bg-white dark:border-slate-700 dark:bg-[#111c2e]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[70rem] flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4"
      >
        <a
          href="#home"
          className="text-2xl font-bold text-[#1f4066] dark:text-blue-200"
        >
          Khaled.
        </a>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-[#2f5d8a] dark:text-blue-300 sm:gap-x-8 sm:text-base">
          <li>
            <a
              className="hover:underline focus-visible:underline"
              href="#projects"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              className="hover:underline focus-visible:underline"
              href="#about"
            >
              About
            </a>
          </li>

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

        <Toggle
          label="Dark mode"
          checked={darkMode}
          onChange={onDarkModeChange}
        />
      </nav>
    </header>
  );
}

export default Header;