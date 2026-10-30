import Toggle from "./Toggle.jsx";

function Header({ darkMode, onDarkModeChange }) {
  return (
    <header className="border-b border-[#e7dedd] bg-white dark:border-[#332629] dark:bg-[#171213]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4 sm:px-6"
      >
        <a href="#home" className="text-xl font-black tracking-[0.08em] text-[#791d2d] dark:text-[#dfb66b] sm:text-2xl">
          911 <span className="font-light">FRAME</span>
        </a>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[#661a29] dark:text-[#e1c38e] sm:gap-x-7">
          <li><a href="#gallery" className="hover:underline">Gallery</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
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
