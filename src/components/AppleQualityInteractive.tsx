import React, { useMemo, useState } from "react";

/**
 * AppleQualityInteractive
 * A self‑contained interactive section for your site with an apple image and
 * 7 zoomable / hoverable quality tests (hotspots + synchronized list).
 *
 * Drop this into your project. Place an apple image at "/apple.png" (or pass a prop).
 * Tailwind recommended but not required (uses minimal classes).
 */

export default function AppleQualityInteractive({
  src = "/apple.png",
  title = "6 different physical and sensory inspections",
}: {
  src?: string;
  title?: string;
}) {
  type TestKey =
    | "Appearance"
    | "Size / Diameter"
    | "Weight"
    | "Firmness"
    | "Skin Condition"
    | "Flavor & Aroma"
    | "Defects";

  const tests: Array<{
    key: TestKey;
    x: number; // % across image
    y: number; // % down image
    blurb: string;
  }> = useMemo(
    () => [
      {
        key: "Appearance",
        x: 64,
        y: 22,
        blurb:
          "Uniform colour; absence of bruises, cuts, blemishes, scald, or decay.",
      },
      {
        key: "Size / Diameter",
        x: 35,
        y: 28,
        blurb: "Compliance with grade standards (diameter).",
      },
      {
        key: "Weight",
        x: 50,
        y: 75,
        blurb: "Check lot weight vs. grade; pairs with diameter for sizing.",
      },
      {
        key: "Firmness",
        x: 28,
        y: 55,
        blurb: "Penetrometer reading of flesh firmness (kg/cm² or lbf).",
      },
      {
        key: "Skin Condition",
        x: 78,
        y: 55,
        blurb: "Absence of wrinkles (dehydration) and smooth, intact skin.",
      },
      {
        key: "Flavor & Aroma",
        x: 56,
        y: 40,
        blurb: "Sensory evaluation for sweetness, acidity and aroma.",
      },
      {
        key: "Defects",
        x: 18,
        y: 35,
        blurb:
          "Look for insect damage, sunburn, russeting, bitter pit, water core.",
      },
    ],
    []
  );

  const [active, setActive] = useState<TestKey | null>("Appearance");
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function focusOn(xPct: number, yPct: number, scale = 1.6) {
    // Convert hotspot % to transform offsets so that point moves toward the center
    const cx = 50;
    const cy = 50;
    const dx = (cx - xPct) / (scale);
    const dy = (cy - yPct) / (scale);
    setZoom(scale);
    setOffset({ x: dx, y: dy });
  }

  function reset() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <section
      id="quality-interactive"
      className="w-full py-12 md:py-16 bg-white text-emerald-900"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8">
          {title}
        </h2>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          {/* Image + hotspots */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-emerald-900/10">
              <div
                className="relative w-full pt-[70%] bg-emerald-50"
                aria-label="Interactive apple quality checks"
              >
                <img
                  src={src}
                  alt="Apple"
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out"
                  style={{
                    transform: `translate(${offset.x}%, ${offset.y}%) scale(${zoom})`,
                    transformOrigin: "50% 50%",
                  }}
                  onLoad={() => reset()}
                />

                {/* Hotspots */}
                {tests.map((t) => (
                  <button
                    key={t.key}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/70 shadow-md backdrop-blur bg-emerald-600/80 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-white/70 transition ${
                      active === t.key ? "scale-110 ring-2 ring-white/80" : ""
                    }`}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    aria-label={t.key}
                    onMouseEnter={() => setActive(t.key)}
                    onFocus={() => setActive(t.key)}
                    onClick={() => {
                      setActive(t.key);
                      focusOn(t.x, t.y);
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between p-3">
                <div className="text-sm opacity-70">
                  Hover a dot or use the list; click to zoom. 
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
                    className="px-3 py-1.5 text-sm rounded-lg border border-emerald-900/20 hover:bg-emerald-50"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.min(2.2, +(z + 0.2).toFixed(2)))}
                    className="px-3 py-1.5 text-sm rounded-lg border border-emerald-900/20 hover:bg-emerald-50"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                  <button
                    onClick={reset}
                    className="px-3 py-1.5 text-sm rounded-lg border border-emerald-900/20 hover:bg-emerald-50"
                    aria-label="Reset view"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details list (syncs with hotspots) */}
          <div className="space-y-3">
            {tests.map((t) => (
              <article
                key={t.key}
                className={`rounded-xl border p-4 transition cursor-pointer ${
                  active === t.key
                    ? "bg-emerald-50 border-emerald-900/30"
                    : "bg-white border-emerald-900/15 hover:bg-emerald-50"
                }`}
                onMouseEnter={() => setActive(t.key)}
                onFocus={() => setActive(t.key)}
                onClick={() => {
                  setActive(t.key);
                  focusOn(t.x, t.y);
                }}
                tabIndex={0}
              >
                <h3 className="font-semibold">{t.key}</h3>
                <p className="text-sm opacity-80 mt-1">{t.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
