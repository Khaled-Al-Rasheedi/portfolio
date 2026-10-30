function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex shrink-0 items-center gap-2 rounded-md text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a52a3c] sm:text-sm"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
          checked
            ? "bg-[#791d2d] dark:bg-[#b68c4a]"
            : "bg-[#c9bfc0] dark:bg-[#55484a]"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

export default Toggle;
