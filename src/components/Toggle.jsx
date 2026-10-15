function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="inline-flex shrink-0 items-center gap-2 rounded-md text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      <span>{label}</span>

      <span
        aria-hidden="true"
        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
          checked
            ? "bg-[#2f5d8a] dark:bg-blue-500"
            : "bg-slate-300 dark:bg-slate-600"
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