import { useEffect, useState } from "react";

// These are visual accents only. Package names/prices come from PostgreSQL.
const icons = {
  single_photo: "📷",
  photo_collection: "📸",
  cinematic_video: "🎬",
};

function formatPrice(amount, currency) {
  return `${(currency || "sar").toUpperCase()} ${(amount / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function Services({ user, checkingSession }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCode, setLoadingCode] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadServices() {
      try {
        const response = await fetch("/api/services", { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load packages.");
        setPackages(data.services);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadServices();
    return () => controller.abort();
  }, []);

  async function handleBuy(serviceCode) {
    setError("");
    setNotice("");
    if (!user) {
      setNotice("Please use Sign in / Sign up in the header before booking a Porsche 911 shoot.");
      return;
    }

    setLoadingCode(serviceCode);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not start checkout.");
      if (!data.url) throw new Error("Checkout URL was missing.");
      window.location.assign(data.url); // Stripe-hosted Checkout in TEST mode.
    } catch (err) {
      setError(err.message);
      setLoadingCode(null);
    }
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-6 border-y border-[#e7dedd] bg-[#f5efed] px-4 py-14 transition-colors duration-200 dark:border-[#38272b] dark:bg-[#120f10] sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-[72rem]">
        <div className="mb-9 flex flex-col gap-3 md:mb-11">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#872436] dark:text-[#dfb66b]">
            911 FRAME STUDIO · PORSCHE 911 ONLY
          </p>
          <h2 id="services-heading" className="text-3xl font-extrabold text-[#421823] dark:text-[#f2d7b0] sm:text-4xl">
            Book a Porsche 911 shoot.
          </h2>
          <p className="max-w-[46rem] text-[#625559] dark:text-[#d6c9c7]">
            One photograph, a curated collection, or a cinematic driving film.
            All packages are exclusively for Porsche 911 models.
          </p>
          <p className="text-sm font-semibold text-[#872436] dark:text-[#dfb66b]">
            Stripe test checkout · No real money will be charged.
          </p>
        </div>

        {loading && <p role="status">Loading Porsche 911 packages from PostgreSQL...</p>}
        {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-red-800 dark:bg-[#382125] dark:text-red-200">{error}</p>}
        {notice && <p role="status" className="mb-5 rounded-lg bg-white p-3 text-[#791d2d] dark:bg-[#241c1e] dark:text-[#dfb66b]">{notice}</p>}

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((item, index) => (
            <article
              key={item.code}
              className="flex flex-col rounded-2xl border border-[#e7dedd] bg-white p-6 shadow-sm transition-colors dark:border-[#49363a] dark:bg-[#1c1718] sm:p-7"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-3xl" role="img" aria-label="Porsche 911 package icon">{icons[item.code] || "🏎️"}</span>
                <span className="text-xs font-bold tracking-[0.2em] text-[#8f747a] dark:text-[#bda8a1]">
                  PACKAGE {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#421823] dark:text-[#f2d7b0]">{item.name}</h3>
              <p className="mb-6 flex-1 text-sm leading-6 text-[#625559] dark:text-[#d6c9c7]">{item.description}</p>
              <p className="mb-5 border-t border-[#eee3df] pt-5 text-sm text-[#68575a] dark:border-[#49363a] dark:text-[#d6c9c7]">
                <span className="font-semibold text-[#421823] dark:text-[#f2d7b0]">Includes: </span>
                {item.includes}
              </p>
              <div className="mb-5 text-3xl font-extrabold text-[#791d2d] dark:text-[#dfb66b]">
                {formatPrice(item.price_cents, item.currency)}
              </div>
              <button
                type="button"
                onClick={() => handleBuy(item.code)}
                disabled={Boolean(loadingCode) || checkingSession}
                className="rounded-lg bg-[#791d2d] px-5 py-3 font-bold text-white transition-colors hover:bg-[#571320] disabled:cursor-wait disabled:opacity-60 dark:bg-[#b68c4a] dark:text-[#1c1210] dark:hover:bg-[#d0a75f]"
              >
                {loadingCode === item.code ? "Opening Stripe..." : "Buy now"}
              </button>
            </article>
          ))}
        </div>
        {!loading && !error && packages.length === 0 && (
          <p>No active packages found. Run the service seed script.</p>
        )}
        <p className="mt-5 text-xs text-[#806b70] dark:text-[#bda8a1]">
          Prices are loaded from PostgreSQL. A successful test payment is confirmed by Stripe's verified webhook.
        </p>
      </div>
    </section>
  );
}

export default Services;
