// Competitive benchmark data for head-to-head comparison blocks.
// Sourced from public spec pages of DJI and Anker as of April 2026.
// Every row maps to a row in the VoltPak spec table so the compare
// component can line up values 1:1.

export type BenchmarkRow = {
  label: string;
  value: string;
};

export type Benchmark = {
  id: string;           // "dji-power-1000"
  brand: string;        // "DJI"
  product: string;      // "Power 1000"
  category: "power-station" | "battery" | "solar";
  rows: BenchmarkRow[];
};

export const BENCHMARKS: Record<string, Benchmark> = {
  "dji-power-1000": {
    id: "dji-power-1000",
    brand: "DJI",
    product: "Power 1000",
    category: "power-station",
    rows: [
      { label: "Capacity", value: "1,024 Wh" },
      { label: "Chemistry", value: "LFP" },
      { label: "Cycle life", value: "4,000 cycles to 70%" },
      { label: "AC continuous", value: "2,200 W" },
      { label: "AC surge", value: "2,600 W (4,400 W peak)" },
      { label: "USB-C", value: "2 × 140 W PD 3.1" },
      { label: "USB-A", value: "2 × 24 W" },
      { label: "AC outlets", value: "2 × 3-prong" },
      { label: "Wireless pad", value: "-" },
      { label: "AC recharge (full)", value: "70 min" },
      { label: "Solar input", value: "800 W (2× MPPT)" },
      { label: "Noise (ECO)", value: "23 dB" },
      { label: "UPS switchover", value: "20 ms" },
      { label: "Weight", value: "13.0 kg (28.6 lb)" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  "anker-solix-c1000": {
    id: "anker-solix-c1000",
    brand: "Anker",
    product: "SOLIX C1000",
    category: "power-station",
    rows: [
      { label: "Capacity", value: "1,056 Wh" },
      { label: "Chemistry", value: "LFP" },
      { label: "Cycle life", value: "3,000 cycles to 80%" },
      { label: "AC continuous", value: "1,800 W" },
      { label: "AC surge", value: "2,400 W" },
      { label: "USB-C", value: "2 × 100 W PD" },
      { label: "USB-A", value: "4 × 12 W" },
      { label: "AC outlets", value: "6 × 3-prong" },
      { label: "Wireless pad", value: "-" },
      { label: "AC recharge (full)", value: "58 min" },
      { label: "Solar input", value: "600 W" },
      { label: "Noise (ECO)", value: "~30 dB" },
      { label: "UPS switchover", value: "20 ms" },
      { label: "Weight", value: "12.9 kg (28.4 lb)" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  "dji-power-2000": {
    id: "dji-power-2000",
    brand: "DJI",
    product: "Power 2000",
    category: "power-station",
    rows: [
      { label: "Capacity", value: "2,048 Wh" },
      { label: "Chemistry", value: "LFP" },
      { label: "Cycle life", value: "4,000 cycles to 70%" },
      { label: "AC continuous", value: "3,000 W" },
      { label: "AC surge", value: "3,600 W" },
      { label: "USB-C", value: "4 × PD" },
      { label: "USB-A", value: "4 ×" },
      { label: "AC outlets", value: "4 × 3-prong" },
      { label: "AC recharge 0–80%", value: "55 min" },
      { label: "AC recharge full", value: "90 min" },
      { label: "Solar input", value: "1,600 W" },
      { label: "Expansion max", value: "22,528 Wh" },
      { label: "Noise (standard)", value: "30 dB" },
      { label: "UPS switchover", value: "10 ms" },
      { label: "Weight", value: "22 kg (48.5 lb)" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  "anker-solix-f1500": {
    id: "anker-solix-f1500",
    brand: "Anker",
    product: "SOLIX F1500",
    category: "power-station",
    rows: [
      { label: "Capacity", value: "1,536 Wh" },
      { label: "Chemistry", value: "LFP" },
      { label: "AC continuous", value: "1,800 W" },
      { label: "AC surge", value: "2,400 W" },
      { label: "AC outlets", value: "6 × 3-prong" },
      { label: "USB-C", value: "2 × PD" },
      { label: "USB-A", value: "4 ×" },
      { label: "AC recharge full", value: "66 min (1 kW AC)" },
      { label: "Solar input", value: "600 W" },
      { label: "UPS switchover", value: "20 ms" },
      { label: "Weight", value: "17 kg (37 lb)" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  "dji-expansion-battery-2000": {
    id: "dji-expansion-battery-2000",
    brand: "DJI",
    product: "Power Expansion Battery 2000",
    category: "battery",
    rows: [
      { label: "Capacity", value: "2,048 Wh" },
      { label: "Chemistry", value: "LFP" },
      { label: "Connection", value: "Proprietary SDC" },
      { label: "Max output (paired)", value: "2,400 W" },
      { label: "Max chain", value: "5 per station" },
      { label: "Hot-swap", value: "No" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  "dji-zignes-100w": {
    id: "dji-zignes-100w",
    brand: "DJI",
    product: "Zignes 100W",
    category: "solar",
    rows: [
      { label: "Rated power", value: "100 W" },
      { label: "Efficiency", value: "~22%" },
      { label: "Cell type", value: "Monocrystalline" },
      { label: "Open-circuit V", value: "29 V" },
      { label: "Short-circuit A", value: "6 A" },
      { label: "Folded", value: "343 × 532 × 50 mm" },
      { label: "Deployed", value: "1,286 × 532 × 25 mm" },
      { label: "Weight", value: "4.1 kg (9 lb)" },
      { label: "IP rating", value: "IP65" },
      { label: "Kickstand", value: "Yes (single angle)" },
      { label: "Connector", value: "SDC" },
      { label: "Operating temp", value: "-20 to 60 °C" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  "anker-solix-ps400": {
    id: "anker-solix-ps400",
    brand: "Anker",
    product: "SOLIX PS400",
    category: "solar",
    rows: [
      { label: "Rated power", value: "400 W" },
      { label: "Efficiency", value: "up to 23%" },
      { label: "Cell type", value: "Monocrystalline" },
      { label: "Short-circuit A", value: "8.33 A (optimum)" },
      { label: "Weight", value: "15.9 kg (35 lb)" },
      { label: "IP rating", value: "IP67" },
      { label: "Kickstand", value: "4-angle (30/40/50/80°)" },
      { label: "Connector", value: "MC4" },
      { label: "Warranty", value: "18 months" },
    ],
  },
};

// Returns benchmark rows aligned with a target product's spec table.
// Pass the product's spec row labels as `labels`, this picks the
// matching competitor values in the same order (missing → "-").
export function alignBenchmark(b: Benchmark, labels: string[]): BenchmarkRow[] {
  return labels.map((label) => {
    const found = b.rows.find(
      (r) => r.label.toLowerCase() === label.toLowerCase()
    );
    return { label, value: found?.value ?? "-" };
  });
}
