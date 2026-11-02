import { useEffect, useState } from "react";

const MAX_POLLS = 12;
const POLL_INTERVAL_MS = 2000;

function formatPrice(cents, currency = "sar") {
  return `${currency.toUpperCase()} ${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

// Stripe redirects here, but ONLY the webhook may change the database to paid.
// The page only GETs the authenticated user's order status and polls if pending.
function PaymentStatus({ outcome, sessionId, user, checkingSession }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (outcome !== "success" || !user || checkingSession || !sessionId) return;
    const controller = new AbortController();
    let timer;
    let tries = 0;
    setAttempt(0);
    setError("");

    async function checkOrder() {
      tries += 1;
      setAttempt(tries);
      try {
        const response = await fetch(
          `/api/orders/by-session/${encodeURIComponent(sessionId)}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not check order.");
        if (controller.signal.aborted) return;
        setOrder(data.order);
        if (data.order.status === "pending" && tries < MAX_POLLS) {
          timer = setTimeout(checkOrder, POLL_INTERVAL_MS);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message);
        if (tries < MAX_POLLS) timer = setTimeout(checkOrder, POLL_INTERVAL_MS);
      }
    }
    checkOrder();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [outcome, sessionId, user?.id, checkingSession, refreshKey]);

  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[#e7dedd] bg-white p-8 shadow-sm dark:border-[#49363a] dark:bg-[#1c1718]">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#872436] dark:text-[#dfb66b]">
          911 FRAME STUDIO · STRIPE TEST MODE
        </p>
        {outcome === "cancel" ? (
          <>
            <h1 className="mb-3 text-3xl font-bold">Checkout canceled</h1>
            <p>No payment confirmation was received. You may select a package and try again.</p>
          </>
        ) : !sessionId ? (
          <>
            <h1 className="mb-3 text-3xl font-bold">Missing Checkout Session</h1>
            <p>This return link does not contain a Stripe session ID.</p>
          </>
        ) : checkingSession ? (
          <><h1 className="mb-3 text-3xl font-bold">Checking your session...</h1></>
        ) : !user ? (
          <>
            <h1 className="mb-3 text-3xl font-bold">Sign in to view your order</h1>
            <p>Use Sign in / Sign up in the header. Order details are only visible to the account that made the purchase.</p>
          </>
        ) : (
          <>
            <h1 className="mb-3 text-3xl font-bold">
              {order?.status === "paid" ? "Payment confirmed!" :
                order?.status === "failed" ? "Payment failed" :
                order?.status === "canceled" ? "Checkout canceled" :
                "Checking your payment..."}
            </h1>
            {order?.status === "paid" ? (
              <p className="mb-4 text-green-700 dark:text-green-300">
                The verified Stripe webhook marked this order as paid. No real money was charged.
              </p>
            ) : (
              <p className="mb-4 text-[#625559] dark:text-[#d6c9c7]">
                Stripe sent you back to the website. We'll confirm the payment only after our server receives and verifies its webhook.
              </p>
            )}
            {order && (
              <div className="mb-5 rounded-lg bg-[#f5efed] p-4 dark:bg-[#302326]">
                <p><strong>Order:</strong> #{order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> {formatPrice(order.total_amount_cents, order.currency)}</p>
                {order.items?.map((item) => (
                  <p key={item.service_code}><strong>Service:</strong> {item.service_name} × {item.quantity}</p>
                ))}
              </div>
            )}
            {error && <p role="alert" className="mb-3 text-red-700 dark:text-red-300">{error}</p>}
            {order?.status === "pending" && attempt >= MAX_POLLS && (
              <p className="mb-3">Still pending. Check the Stripe CLI/Render webhook logs, then try again.</p>
            )}
            {attempt >= MAX_POLLS && order?.status !== "paid" && (
              <button
                type="button"
                onClick={() => { setOrder(null); setRefreshKey((x) => x + 1); }}
                className="mr-3 rounded-lg border border-[#791d2d] px-4 py-2 font-semibold text-[#791d2d] dark:border-[#dfb66b] dark:text-[#dfb66b]"
              >
                Check again
              </button>
            )}
          </>
        )}
        <a href="/#services" className="mt-5 inline-block rounded-lg bg-[#791d2d] px-5 py-3 font-semibold text-white dark:bg-[#b68c4a] dark:text-[#1c1210]">
          Back to Porsche 911 packages 🏎️
        </a>
      </div>
    </main>
  );
}

export default PaymentStatus;
