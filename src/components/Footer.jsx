function Footer() {
  return (
    <footer className="bg-[#541824] px-4 py-7 text-white dark:bg-[#090808] dark:text-[#ead5b5] sm:px-6">
      <div className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm">
        <p>© 2026 Khaled · 911 Frame · Independent portfolio concept</p>
        <p>
          Sample photos credited per image ·{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:no-underline"
          >
            CC BY-SA 4.0
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
