// Authoritative per-product detail data. Every product page reads from
// this file - no content is hard-coded in JSX.  Benchmarks live in
// lib/benchmarks.ts and are referenced by id from `compareAgainst`.

export type SpecRow = { label: string; value: string; note?: string };

export type SpecGroup = {
  group: string; // "Battery" | "AC Output" | "USB" | "Input" | "Physical" | …
  rows: SpecRow[];
};

export type Feature = {
  id: string; // anchor id (lowercase, dash-separated)
  eyebrow: string;
  title: string;
  body: string;
  media: { type: "image" | "video"; src: string; alt: string; poster?: string };
  callouts?: { label: string; value: string }[];
  tone?: "light" | "dark"; // background treatment
};

export type Highlight = { stat: string; label: string; note?: string };

export type ProductDetail = {
  id: string;
  shortDesc: string;
  longDesc: string;
  heroTagline: { lineA: string; lineB: string }; // two-line H1 on the product page
  heroMedia: { type: "image" | "video"; src: string; poster?: string };
  highlights: Highlight[]; // 3-up big stat band
  features: Feature[];
  inTheBox: string[];
  specs: SpecGroup[];
  faq: { q: string; a: string }[];
  compareAgainst?: string[]; // keys into lib/benchmarks.ts
  certifications: string[];
  warranty: { unit: string; battery: string; accessories?: string };
  shipping: { usFreeOver: number; intlAvailable: boolean };
  compatibleWith?: string[]; // product ids this pairs with (for batteries, solar, accessories)
};

// ──────────────────────────────────────────────────────────────
// VoltPak 1000 - flagship
// ──────────────────────────────────────────────────────────────
const VP1000: ProductDetail = {
  id: "vp-1000",
  shortDesc:
    "Silent 1,024 Wh LFP power station with 2,200 W AC, two 140 W USB-C PD 3.1 ports and a 70-minute AC recharge.",
  longDesc:
    "The VoltPak 1000 is engineered around three principles: stay safe, stay silent, stay out of your way. 1,024 Wh of automotive-grade LiFePO4 cells. 2,200 W of clean sine-wave AC output. 23 dB in ECO mode - quieter than a library, quiet enough for your bedroom.",
  heroTagline: { lineA: "Silent power.", lineB: "Serious output." },
  heroMedia: { type: "video", src: "/media/hero.mp4", poster: "/media/hero.webp" },
  highlights: [
    { stat: "2,200W", label: "AC continuous", note: "4,400W motor surge" },
    { stat: "1,024Wh", label: "LFP capacity", note: "4,000 cycles to 80%" },
    { stat: "23dB", label: "Whisper quiet", note: "ECO mode" },
  ],
  features: [
    {
      id: "safety",
      eyebrow: "Safety built in",
      title: "LFP cells. 11 sensors. 10 fuses.",
      body:
        "A flame-retardant polycarbonate body over an aluminum chassis. Third-party safety certification is planned before shipping. Lithium Iron Phosphate chemistry rated for 4,000 charge cycles - a decade of daily use before capacity drops to 80%.",
      media: {
        type: "image",
        src: "/media/assembly.jpg",
        alt: "Exploded view of VoltPak 1000 internal safety construction",
      },
      callouts: [
        { label: "Certification", value: "Planned" },
        { label: "Thermal sensors", value: "11" },
        { label: "Circuit fuses", value: "10" },
      ],
      tone: "dark",
    },
    {
      id: "charge",
      eyebrow: "Charge anywhere",
      title: "Grid. Sun. Road.",
      body:
        "Three ways to fill it. 70 minutes from empty on a standard wall outlet, 45 minutes with VoltLink Turbo. 800 W of solar input across two MPPT channels. A 12 V car cable for topping up on the move.",
      media: {
        type: "image",
        src: "/media/front-ports.jpg",
        alt: "Front panel showing AC, USB-C, USB-A and car outlets",
      },
      callouts: [
        { label: "AC fast", value: "70 min" },
        { label: "Solar max", value: "800 W" },
        { label: "Car 12 V", value: "8 hr" },
      ],
    },
    {
      id: "outputs",
      eyebrow: "Power everything",
      title: "12 outputs. 0 adapters.",
      body:
        "Four NEMA 5-15R AC outlets. Two 140 W USB-C PD 3.1 ports for laptops. Two 24 W USB-A QC 3.0. A 12 V car outlet. A 15 W Qi wireless pad on top. Run your studio, your fridge, your CPAP - at the same time.",
      media: {
        type: "image",
        src: "/media/front-ports.jpg",
        alt: "Close-up of the VoltPak 1000 front port layout",
      },
      callouts: [
        { label: "4 × AC", value: "2,200 W total" },
        { label: "2 × USB-C", value: "140 W PD 3.1" },
        { label: "2 × USB-A", value: "24 W QC 3.0" },
        { label: "1 × Qi", value: "15 W wireless" },
      ],
      tone: "dark",
    },
    {
      id: "quiet",
      eyebrow: "Whisper quiet",
      title: "23 decibels.",
      body:
        "Quiet enough to run in your bedroom overnight, on a conference call at a job site, or inside a tent without waking the campground. Variable-speed fans only spin up when the load actually needs them.",
      media: {
        type: "image",
        src: "/media/side.webp",
        alt: "VoltPak 1000 on a nightstand in a quiet room",
      },
      callouts: [
        { label: "ECO mode", value: "23 dB" },
        { label: "Standard", value: "28 dB" },
        { label: "Library", value: "40 dB" },
      ],
    },
    {
      id: "app",
      eyebrow: "VoltPak App",
      title: "Your power, on your phone.",
      body:
        "Real-time monitoring of input, output and remaining runtime. Schedule charging to off-peak rates. OTA firmware updates keep efficiency improving after you unbox it.",
      media: {
        type: "image",
        src: "/media/front-qtr.jpg",
        alt: "VoltPak app on a phone next to the power station",
      },
      callouts: [
        { label: "iOS + Android", value: "Free" },
        { label: "Wi-Fi", value: "2.4 GHz" },
        { label: "Bluetooth", value: "5.2" },
      ],
      tone: "dark",
    },
  ],
  inTheBox: [
    "VoltPak 1000 Power Station",
    "AC charging cable (6 ft)",
    "Car charging cable (12 V → SDC, 6 ft)",
    "MC4 → SDC solar adapter",
    "User manual & quick-start guide",
    "5-year warranty card",
  ],
  specs: [
    {
      group: "Battery",
      rows: [
        { label: "Chemistry", value: "LiFePO4 (LFP), automotive-grade" },
        { label: "Capacity", value: "1,024 Wh" },
        { label: "Nominal voltage", value: "25.6 V" },
        { label: "Cycle life", value: "4,000 cycles to 80%" },
        { label: "Shelf life", value: "12 months / full charge" },
        { label: "Operating temperature", value: "14 °F to 104 °F (-10 to 40 °C)" },
        { label: "Storage temperature", value: "-4 °F to 113 °F" },
      ],
    },
    {
      group: "AC Output",
      rows: [
        { label: "Continuous", value: "2,200 W pure sine (120 V / 60 Hz)" },
        { label: "Surge", value: "2,600 W" },
        { label: "Motor peak", value: "4,400 W" },
        { label: "Outlets", value: "4 × NEMA 5-15R" },
        { label: "THD", value: "< 3%" },
      ],
    },
    {
      group: "DC / USB Output",
      rows: [
        { label: "USB-C", value: "2 × PD 3.1, up to 140 W each" },
        { label: "USB-A", value: "2 × QC 3.0, 24 W each" },
        { label: "Car outlet", value: "1 × 12 V / 10 A regulated" },
        { label: "SDC", value: "9–28 V or 32–58.4 V, max 42 A" },
        { label: "Wireless pad", value: "15 W Qi, top surface" },
        { label: "Total output ports", value: "12" },
      ],
    },
    {
      group: "Input / Charging",
      rows: [
        { label: "AC standard", value: "600 W (0–100% in 110 min)" },
        { label: "AC fast", value: "1,200 W (0–100% in 70 min, 0–80% in 50 min)" },
        { label: "AC Turbo (VoltLink)", value: "1,800 W (0–100% in 45 min)" },
        { label: "Solar MPPT", value: "12–60 V, up to 800 W (2 × 400 W)" },
        { label: "Car 12 V", value: "120 W (8 hr)" },
        { label: "Pass-through charging", value: "Yes" },
      ],
    },
    {
      group: "UPS",
      rows: [
        { label: "EPS switchover", value: "< 10 ms" },
        { label: "Mode", value: "Online double-conversion on demand" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Dimensions", value: "13.4 × 10.2 × 9.6 in (340 × 260 × 245 mm)" },
        { label: "Weight", value: "28 lb (12.7 kg)" },
        { label: "Enclosure", value: "Flame-retardant polycarbonate / aluminum chassis" },
        { label: "Display", value: "3.5\" color TFT" },
        { label: "Noise (ECO)", value: "23 dB" },
        { label: "Noise (standard)", value: "28 dB" },
        { label: "IP rating", value: "IPX3 (splash resistant)" },
      ],
    },
    {
      group: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "802.11 b/g/n (2.4 GHz)" },
        { label: "Bluetooth", value: "5.2" },
        { label: "App", value: "iOS + Android (OTA updates, schedules, load monitor)" },
      ],
    },
    {
      group: "Safety",
      rows: [
        { label: "Temperature sensors", value: "11" },
        { label: "Circuit fuses", value: "10" },
        { label: "BMS", value: "Multi-stage (OCP / OVP / OTP / SCP / reverse polarity)" },
        { label: "Case rating", value: "UL 94 V-0 flame-retardant (design target)" },
      ],
    },
  ],
  faq: [
    {
      q: "How long does a full charge last?",
      a: "It depends on the load. A full-size fridge (120 W) runs ~8 hours. A router plus a few LED lights stretches to 30+ hours. A CPAP machine runs for 2–3 nights.",
    },
    {
      q: "Can I charge it and run a load at the same time?",
      a: "Yes. Pass-through charging is supported. Output prioritizes the connected device; any leftover input current tops up the battery.",
    },
    {
      q: "Is it airline-safe?",
      a: "No. At 1,024 Wh it exceeds the FAA 100 Wh carry-on limit. Like every competing power station in this class, it must travel by ground.",
    },
    {
      q: "Can I daisy-chain expansion batteries?",
      a: "Yes. Up to five Expansion Battery 2000 units per Station for a combined 11,264 Wh. Hot-swap is supported - no power-down required.",
    },
    {
      q: "What's covered under warranty?",
      a: "Five years on the unit, three years on the battery. Register within 30 days for an extra two years on the unit.",
    },
    {
      q: "Can it run a full-size microwave or air conditioner?",
      a: "Most 1,000 W microwaves and window ACs up to 8,000 BTU run fine under the 2,200 W continuous limit. 4,400 W surge handles the start-up spike.",
    },
  ],
  compareAgainst: ["dji-power-1000", "anker-solix-c1000"],
  certifications: ["FCC", "UL 2743", "DOE", "CEC", "Prop 65", "SGS", "RoHS", "CE", "UKCA"],
  warranty: { unit: "5 years (+2 with registration)", battery: "3 years", accessories: "1 year" },
  shipping: { usFreeOver: 100, intlAvailable: false },
};

// ──────────────────────────────────────────────────────────────
// VoltPak 2000 - pro 2 kWh class
// ──────────────────────────────────────────────────────────────
const VP2000: ProductDetail = {
  id: "vp-2000",
  shortDesc:
    "2,048 Wh LFP, 3,000 W continuous AC, 50-minute 0–80% charge and up to 22,528 Wh of whole-home expansion.",
  longDesc:
    "The VoltPak 2000 doubles everything that matters. Twice the capacity, more than enough output to run power tools, and a 22,528 Wh expansion ceiling for true whole-home backup. Still under 47 pounds. Still below 30 dB.",
  heroTagline: { lineA: "Double the capacity.", lineB: "Still whisper quiet." },
  heroMedia: { type: "image", src: "/media/side.webp" },
  highlights: [
    { stat: "3,000W", label: "AC continuous", note: "6,000W motor peak" },
    { stat: "2,048Wh", label: "LFP capacity", note: "expandable to 22.5 kWh" },
    { stat: "26dB", label: "Quieter than most fridges", note: "ECO mode" },
  ],
  features: [
    {
      id: "expansion",
      eyebrow: "Whole-home scale",
      title: "Stack to 22.5 kWh.",
      body:
        "Chain up to five Expansion Battery 2000 units on a single station. Enough reserve to run a refrigerator, router, CPAP and a few LED circuits for multiple days - silently.",
      media: {
        type: "image",
        src: "/media/rear.jpg",
        alt: "VoltPak 2000 stacked with expansion batteries",
      },
      callouts: [
        { label: "Base", value: "2,048 Wh" },
        { label: "Max chain", value: "5 × Expansion" },
        { label: "Total ceiling", value: "22,528 Wh" },
      ],
      tone: "dark",
    },
    {
      id: "ac-pro",
      eyebrow: "Pro AC output",
      title: "3,000 W. RV-ready.",
      body:
        "Four NEMA 5-15R outlets plus one NEMA TT-30 for RV shore-power. 3,000 W continuous pure sine wave - enough for a miter saw, a residential AC compressor or a full recording rig.",
      media: {
        type: "image",
        src: "/media/front-ports.jpg",
        alt: "VoltPak 2000 AC output panel with RV outlet",
      },
      callouts: [
        { label: "AC continuous", value: "3,000 W" },
        { label: "Motor peak", value: "6,000 W" },
        { label: "RV outlet", value: "TT-30" },
      ],
    },
    {
      id: "charge-2k",
      eyebrow: "Charge in under an hour",
      title: "50 minutes to 80%.",
      body:
        "1,800 W VoltLink Turbo AC charging. 1,600 W solar input. Hybrid recharge (AC + solar simultaneously) for the fastest possible refill after an outage.",
      media: {
        type: "image",
        src: "/media/lifestyle.webp",
        alt: "VoltPak 2000 charging from solar panels",
      },
      callouts: [
        { label: "AC 0–80%", value: "50 min" },
        { label: "AC full", value: "85 min" },
        { label: "Solar max", value: "1,600 W" },
      ],
      tone: "dark",
    },
  ],
  inTheBox: [
    "VoltPak 2000 Power Station",
    "AC charging cable (6 ft)",
    "Car charging cable (12 V → SDC)",
    "MC4 → SDC solar adapter",
    "VoltLink expansion cable",
    "User manual & quick-start guide",
    "5-year warranty card",
  ],
  specs: [
    {
      group: "Battery",
      rows: [
        { label: "Chemistry", value: "LiFePO4 (LFP)" },
        { label: "Capacity", value: "2,048 Wh" },
        { label: "Nominal voltage", value: "51.2 V" },
        { label: "Cycle life", value: "4,000 cycles to 80%" },
        { label: "Expansion", value: "Up to 5 × Expansion Battery 2000 (22,528 Wh total)" },
      ],
    },
    {
      group: "AC Output",
      rows: [
        { label: "Continuous", value: "3,000 W pure sine (split-phase 120 V)" },
        { label: "Surge", value: "3,600 W" },
        { label: "Motor peak", value: "6,000 W" },
        { label: "Outlets", value: "4 × NEMA 5-15R + 1 × NEMA TT-30" },
        { label: "240 V mode", value: "Available with Smart Home Panel" },
      ],
    },
    {
      group: "DC / USB Output",
      rows: [
        { label: "USB-C", value: "4 × PD 3.1 (2 × 140 W + 2 × 100 W)" },
        { label: "USB-A", value: "4 × QC 3.0, 24 W each" },
        { label: "Car outlet", value: "1 × 12 V / 10 A" },
        { label: "SDC", value: "2 × ports" },
      ],
    },
    {
      group: "Input",
      rows: [
        { label: "AC Turbo", value: "1,800 W (0–80% in 50 min, full in 85 min)" },
        { label: "Solar MPPT", value: "12–60 V, up to 1,600 W" },
        { label: "Car 12 V", value: "240 W" },
        { label: "Hybrid recharge", value: "AC + solar simultaneously" },
      ],
    },
    {
      group: "UPS",
      rows: [{ label: "Switchover", value: "< 10 ms" }],
    },
    {
      group: "Physical",
      rows: [
        { label: "Dimensions", value: "16.9 × 11.6 × 12.0 in (430 × 295 × 305 mm)" },
        { label: "Weight", value: "46 lb (20.8 kg)" },
        { label: "Noise (ECO)", value: "26 dB" },
        { label: "Noise (standard)", value: "32 dB" },
      ],
    },
    {
      group: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6 (2.4 / 5 GHz)" },
        { label: "Bluetooth", value: "5.2" },
        { label: "Ethernet", value: "RJ-45 for Smart Home Panel" },
      ],
    },
  ],
  faq: [
    {
      q: "How does expansion pairing work?",
      a: "Plug a VoltLink cable into the station and into an Expansion Battery 2000. The station picks up the new capacity within seconds and inherits the full AC output ceiling. Hot-swap is supported.",
    },
    {
      q: "Can it power a central air conditioner?",
      a: "Window units and portable ACs up to 12,000 BTU run fine. Central HVAC with a standard compressor start kit works via the 240 V Smart Home Panel accessory.",
    },
    {
      q: "Is it loud under heavy load?",
      a: "At full 3,000 W output the fans reach 32 dB - about the level of a library. In ECO mode at typical home-backup loads it stays at 26 dB.",
    },
    {
      q: "How heavy is it with expansion batteries?",
      a: "Each Expansion Battery 2000 adds ~45 lb. The station + 2 batteries is ~136 lb total, installed once in place rather than carried daily.",
    },
  ],
  compareAgainst: ["dji-power-2000", "anker-solix-f1500"],
  certifications: [
    "FCC",
    "UL 2743",
    "UL 9540 (ESS)",
    "DOE",
    "CEC",
    "Prop 65",
    "SGS",
    "RoHS",
    "CE",
    "UKCA",
  ],
  warranty: { unit: "5 years (+2 with registration)", battery: "3 years", accessories: "1 year" },
  shipping: { usFreeOver: 100, intlAvailable: false },
};

// ──────────────────────────────────────────────────────────────
// Expansion Battery 2000 (simplified lineup - one expansion SKU)
// ──────────────────────────────────────────────────────────────
const VP_BATT_2K: ProductDetail = {
  id: "vp-battery-2k",
  shortDesc:
    "2,048 Wh LFP expansion pack. One cable, double the runtime. Hot-swap supported.",
  longDesc:
    "The Expansion Battery 2000 is passive capacity on demand. It inherits the parent station's output ceiling, BMS safety profile, and warranty. Chain up to five per station. No independent output - all energy routes through the VoltPak station you already own.",
  heroTagline: { lineA: "Double the runtime.", lineB: "Same VoltPak." },
  heroMedia: { type: "image", src: "/media/side.webp" },
  highlights: [
    { stat: "2,048Wh", label: "LFP expansion" },
    { stat: "5×", label: "Max chain" },
    { stat: "Hot-swap", label: "No power-down" },
  ],
  features: [
    {
      id: "voltlink",
      eyebrow: "One cable",
      title: "Plug in. Keep going.",
      body:
        "The VoltLink connector carries power and BMS telemetry in a single sealed cable. The station recognizes the new capacity within seconds and shows combined runtime in the VoltPak app.",
      media: {
        type: "image",
        src: "/media/battery.webp",
        alt: "VoltLink cable connecting expansion battery",
      },
      callouts: [
        { label: "Connector", value: "VoltLink SDC" },
        { label: "Telemetry", value: "Yes" },
        { label: "Hot-swap", value: "Yes" },
      ],
      tone: "dark",
    },
    {
      id: "scale",
      eyebrow: "Stack as needed",
      title: "Up to 22.5 kWh.",
      body:
        "One battery doubles the runtime. Five batteries turn a VoltPak 2000 into whole-home backup for multi-day outages. Add them as budget allows - the station ceiling is fixed at five.",
      media: {
        type: "image",
        src: "/media/battery_stack.webp",
        alt: "Multiple expansion batteries stacked with a station",
      },
    },
  ],
  inTheBox: [
    "Expansion Battery 2000",
    "VoltLink SDC cable (3 ft)",
    "User manual",
    "3-year warranty card",
  ],
  specs: [
    {
      group: "Battery",
      rows: [
        { label: "Chemistry", value: "LiFePO4 (LFP)" },
        { label: "Capacity", value: "2,048 Wh" },
        { label: "Cycle life", value: "4,000 cycles to 80%" },
      ],
    },
    {
      group: "Pairing",
      rows: [
        { label: "Connector", value: "VoltLink SDC (included)" },
        { label: "Telemetry", value: "Yes - appears as unified capacity in app" },
        { label: "Hot-swap", value: "Yes" },
        { label: "Max output (inherits station)", value: "2,200 W (VoltPak 1000) / 3,000 W (VoltPak 2000)" },
        { label: "Max chain per station", value: "5" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Dimensions", value: "16.5 × 11.4 × 11.8 in (420 × 290 × 300 mm)" },
        { label: "Weight", value: "45 lb (20.2 kg)" },
        { label: "Enclosure", value: "Flame-retardant polycarbonate" },
        { label: "IP rating", value: "IPX3" },
      ],
    },
    {
      group: "Compatibility",
      rows: [
        { label: "VoltPak 1000", value: "Yes (station output caps at 2,200 W)" },
        { label: "VoltPak 2000", value: "Yes (station output caps at 3,000 W)" },
        { label: "Third-party stations", value: "Not supported" },
      ],
    },
  ],
  faq: [
    {
      q: "Does it have outlets of its own?",
      a: "No. The Expansion Battery is a pure capacity extension. All power delivery goes through the VoltPak station you pair it with.",
    },
    {
      q: "Can I mix a Station 1000 with an Expansion 2000?",
      a: "Yes, but the station's AC ceiling still caps at 2,200 W. You get more runtime, not more power.",
    },
    {
      q: "What happens if one battery in a chain fails?",
      a: "The BMS isolates the failed pack and the station continues running on the remaining chain. The app flags the faulty unit by serial.",
    },
  ],
  compareAgainst: ["dji-expansion-battery-2000"],
  certifications: ["FCC", "UL 2743", "DOE", "CEC", "Prop 65", "RoHS", "CE"],
  warranty: { unit: "3 years", battery: "3 years" },
  shipping: { usFreeOver: 100, intlAvailable: false },
  compatibleWith: ["vp-1000", "vp-2000"],
};

// ──────────────────────────────────────────────────────────────
// Solar Panel 220W - foldable portable
// ──────────────────────────────────────────────────────────────
const VP_SOLAR_220: ProductDetail = {
  id: "vp-solar-220",
  shortDesc:
    "23.5% efficient foldable solar panel with dual SDC + MC4 output, IP67 sealed, 3-angle magnetic kickstand.",
  longDesc:
    "A foldable monocrystalline PERC panel rated at 220 W under full sun. Dual SDC and MC4 outputs mean it pairs with both VoltPak and any third-party MPPT on the market. Weather-sealed to IP67 - run it through the afternoon thunderstorm.",
  heroTagline: { lineA: "Fold it.", lineB: "Forget it." },
  heroMedia: { type: "image", src: "/media/lifestyle.webp" },
  highlights: [
    { stat: "220W", label: "Rated output", note: "23.5% efficiency" },
    { stat: "IP67", label: "Rain & dust sealed" },
    { stat: "15lb", label: "Foldable 4-panel", note: "6.8 kg" },
  ],
  features: [
    {
      id: "efficient",
      eyebrow: "PERC monocrystalline",
      title: "23.5% conversion.",
      body:
        "Passivated Emitter Rear Contact cells squeeze more watts out of the same surface area. In full midday sun you'll see 210+ W sustained; overcast-but-bright drops only to ~140 W.",
      media: {
        type: "image",
        src: "/media/lifestyle.webp",
        alt: "Solar panel deployed in a sunny clearing",
      },
      callouts: [
        { label: "Cell", value: "Mono PERC" },
        { label: "Efficiency", value: "23.5%" },
      ],
    },
    {
      id: "dual-out",
      eyebrow: "SDC + MC4",
      title: "Works with what you own.",
      body:
        "SDC plugs straight into any VoltPak station. MC4 plugs into any third-party MPPT on the market - Jackery, EcoFlow, Bluetti, Goal Zero, Renogy. One panel, any ecosystem.",
      media: {
        type: "image",
        src: "/media/front-ports.jpg",
        alt: "Dual SDC and MC4 connectors on back of panel",
      },
      tone: "dark",
    },
    {
      id: "weatherproof",
      eyebrow: "IP67 sealed",
      title: "Rain doesn't stop it.",
      body:
        "The full panel + connectors meet IP67 - 30 minutes in 1 m of water, dust-tight, operating from -20 °C to 65 °C. Leave it out for the afternoon storm and come back to topped-up batteries.",
      media: {
        type: "image",
        src: "/media/assembly.jpg",
        alt: "Solar panel in rain",
      },
    },
  ],
  inTheBox: [
    "Solar Panel 220W (4-panel foldable)",
    "Integrated 3 m SDC + MC4 cable",
    "Nylon carry case with shoulder strap",
    "Quick-start card",
    "2-year product warranty",
    "10-year output warranty",
  ],
  specs: [
    {
      group: "Electrical",
      rows: [
        { label: "Rated power", value: "220 W (STC)" },
        { label: "Efficiency", value: "23.5%" },
        { label: "Cell type", value: "Monocrystalline PERC" },
        { label: "Vmp", value: "22.0 V" },
        { label: "Imp", value: "10.0 A" },
        { label: "Voc (open-circuit)", value: "26.0 V" },
        { label: "Isc (short-circuit)", value: "10.5 A" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Folded", value: "20.5 × 24 × 1.4 in (520 × 610 × 35 mm)" },
        { label: "Deployed", value: "83 × 24 × 0.87 in (2,100 × 610 × 22 mm)" },
        { label: "Weight", value: "15 lb (6.8 kg)" },
        { label: "IP rating", value: "IP67 (panel + connectors)" },
        { label: "Kickstand", value: "3-angle magnetic (30°/45°/60°)" },
      ],
    },
    {
      group: "Connectivity",
      rows: [
        { label: "Output connectors", value: "SDC + MC4 (dual)" },
        { label: "Cable length", value: "3 m (integrated)" },
        { label: "Compatible MPPT voltage", value: "12–60 V" },
      ],
    },
    {
      group: "Environmental",
      rows: [
        { label: "Operating temperature", value: "-20 °C to 65 °C" },
        { label: "Storage temperature", value: "-30 °C to 75 °C" },
      ],
    },
    {
      group: "Compatibility",
      rows: [
        { label: "VoltPak 1000 / 2000", value: "SDC, direct plug-in" },
        { label: "Third-party stations", value: "MC4 (12–60 V MPPT)" },
        { label: "Parallel panels", value: "Up to 2 via Y-cable (sold separately)" },
      ],
    },
  ],
  faq: [
    {
      q: "Will it work with my EcoFlow / Jackery / Bluetti?",
      a: "Yes - use the MC4 output. Any station with an MPPT in the 12–60 V range accepts the 220 W panel directly.",
    },
    {
      q: "Do I need two panels for a VoltPak 1000?",
      a: "One panel works. The station's 800 W MPPT ceiling lets you run up to four in parallel for faster fill-up in the field.",
    },
    {
      q: "How long does it take to fully charge a VoltPak 1000 from solar?",
      a: "Under peak sun (~200 W sustained), about 5 hours. Two panels in parallel cut that to ~2.5 hours.",
    },
  ],
  compareAgainst: ["dji-zignes-100w", "anker-solix-ps400"],
  certifications: ["FCC", "CE", "RoHS", "IEC 61215", "IEC 61730"],
  warranty: { unit: "2 years", battery: "N/A", accessories: "10-year >80% rated output" },
  shipping: { usFreeOver: 100, intlAvailable: false },
  compatibleWith: ["vp-1000", "vp-2000"],
};

// ──────────────────────────────────────────────────────────────
// Solar Panel 400W Bifacial - rigid high-yield
// ──────────────────────────────────────────────────────────────
const VP_SOLAR_400: ProductDetail = {
  id: "vp-solar-400",
  shortDesc:
    "400 W rigid bifacial solar panel - 23% front efficiency plus up to 25% albedo gain from the rear.",
  longDesc:
    "A rigid monocrystalline bifacial panel for permanent installations, campers, cabins and ground-mount arrays. The rear-side cells pick up reflected light for real-world gains up to 25% above the 400 W rating.",
  heroTagline: { lineA: "400 watts.", lineB: "Plus a bonus." },
  heroMedia: { type: "image", src: "/media/side.webp" },
  highlights: [
    { stat: "400W", label: "Front rating" },
    { stat: "+25%", label: "Rear albedo gain" },
    { stat: "IP68", label: "Fully sealed" },
  ],
  features: [
    {
      id: "bifacial",
      eyebrow: "Bifacial cells",
      title: "Sun from both sides.",
      body:
        "Transparent backsheet lets reflected light hit the rear cells too. On white gravel or snow you'll see up to 500 W out of the panel - without changing the mount.",
      media: {
        type: "image",
        src: "/media/lifestyle.webp",
        alt: "Bifacial panel mounted on gravel",
      },
      callouts: [
        { label: "Front", value: "400 W" },
        { label: "Rear gain", value: "up to +25%" },
      ],
    },
    {
      id: "rigid",
      eyebrow: "Built to stay up",
      title: "Permanent-install ready.",
      body:
        "Aluminum frame, 3.2 mm tempered glass, IP68 junction box. Designed for ground-mount, rooftop and RV-mount deployments that stay in the weather year-round.",
      media: {
        type: "image",
        src: "/media/assembly.jpg",
        alt: "Rigid panel installed on an RV",
      },
      tone: "dark",
    },
  ],
  inTheBox: [
    "Solar Panel 400W Bifacial",
    "MC4 junction box pre-installed",
    "Mounting hardware (4-corner)",
    "Quick-start card",
    "5-year product warranty",
    "25-year output warranty",
  ],
  specs: [
    {
      group: "Electrical",
      rows: [
        { label: "Rated power (front)", value: "400 W (STC)" },
        { label: "Bifacial gain", value: "up to +25%" },
        { label: "Efficiency", value: "23% front" },
        { label: "Cell type", value: "Monocrystalline bifacial" },
        { label: "Voc", value: "38 V" },
        { label: "Isc", value: "11 A" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Dimensions", value: "70 × 40 × 1.4 in (1,780 × 1,020 × 35 mm)" },
        { label: "Weight", value: "40 lb (18 kg)" },
        { label: "IP rating", value: "IP68 (junction box)" },
        { label: "Glass", value: "3.2 mm tempered, transparent backsheet" },
      ],
    },
    {
      group: "Connectivity",
      rows: [
        { label: "Output connector", value: "MC4" },
        { label: "Cable length", value: "1 m leads (junction box)" },
      ],
    },
    {
      group: "Compatibility",
      rows: [
        { label: "VoltPak stations", value: "Via MC4 → SDC adapter (included with station)" },
        { label: "Third-party MPPT", value: "Yes (12–60 V range)" },
      ],
    },
  ],
  faq: [
    {
      q: "Can I use two 400W panels in series on a VoltPak 2000?",
      a: "Yes - the Station 2000 MPPT accepts up to 60 V. Two 400W panels in series stay within that ceiling and feed the full 1,600 W solar input.",
    },
    {
      q: "How do I get the bifacial bonus?",
      a: "Mount the panel with reflective material behind it - white gravel, snow, white membrane roofing - and leave at least 15 cm of air gap for the rear cells to see light.",
    },
  ],
  compareAgainst: ["anker-solix-ps400"],
  certifications: ["FCC", "CE", "RoHS", "IEC 61215", "IEC 61730", "IEC 61701"],
  warranty: { unit: "5 years", battery: "N/A", accessories: "25-year >80% output" },
  shipping: { usFreeOver: 100, intlAvailable: false },
  compatibleWith: ["vp-1000", "vp-2000"],
};

// ──────────────────────────────────────────────────────────────
// Bundles
// ──────────────────────────────────────────────────────────────
const VP_1000_SOLAR: ProductDetail = {
  id: "vp-1000-solar",
  shortDesc:
    "VoltPak 1000 + Solar Panel 220W. Everything you need for off-grid power - $99 less than buying separately.",
  longDesc:
    "A complete off-grid starter: the flagship 1,024 Wh VoltPak 1000 paired with the 220 W foldable solar panel. Save $99 vs. buying them separately.",
  heroTagline: { lineA: "Station plus sun.", lineB: "Save $99." },
  heroMedia: { type: "image", src: "/media/lifestyle.webp" },
  highlights: [
    { stat: "1,024Wh", label: "Station capacity" },
    { stat: "220W", label: "Solar input" },
    { stat: "$99", label: "Bundle savings" },
  ],
  features: [
    {
      id: "complete",
      eyebrow: "Pair-for-pair",
      title: "Everything talks SDC.",
      body:
        "The Solar Panel 220W plugs straight into the VoltPak 1000 SDC port. No adapter. No MC4 conversion. You're charging from sun in under thirty seconds.",
      media: {
        type: "image",
        src: "/media/assembly.jpg",
        alt: "VoltPak 1000 plugged into 220W panel",
      },
      tone: "dark",
    },
  ],
  inTheBox: [
    "VoltPak 1000 Power Station",
    "Solar Panel 220W (foldable)",
    "AC charging cable (6 ft)",
    "Car charging cable",
    "MC4 → SDC adapter",
    "Solar carry case",
    "Quick-start bundle guide",
  ],
  specs: [
    {
      group: "Bundle contents",
      rows: [
        { label: "Station", value: "VoltPak 1000 · 1,024 Wh · 2,200 W AC" },
        { label: "Solar", value: "Solar Panel 220W · 23.5% efficient · IP67" },
      ],
    },
    {
      group: "Fill-up time",
      rows: [
        { label: "Station from solar (peak sun)", value: "~5 hr" },
        { label: "Station from AC standard", value: "110 min" },
        { label: "Station from AC fast", value: "70 min" },
      ],
    },
    {
      group: "Savings",
      rows: [
        { label: "Buy separately", value: "$1,348" },
        { label: "Bundle price", value: "$1,249" },
        { label: "You save", value: "$99" },
      ],
    },
  ],
  faq: [
    {
      q: "Do I get both the SDC and MC4 adapters?",
      a: "Yes. Both cables ship in the bundle, so you can still charge a third-party panel into the Station or use the 220W panel with a non-VoltPak MPPT.",
    },
  ],
  certifications: VP1000.certifications,
  warranty: { unit: "5 years (station) / 2 years (panel)", battery: "3 years" },
  shipping: { usFreeOver: 100, intlAvailable: false },
};

const VP_2000_SOLAR_KIT: ProductDetail = {
  id: "vp-2000-solar",
  shortDesc:
    "VoltPak 2000 + two 220W solar panels. A true off-grid backup setup for a fraction of a home-battery install.",
  longDesc:
    "Pair the 2,048 Wh VoltPak 2000 with two 220W panels for 440 W of total solar input. Enough to refill the station inside a single sunny day, or to sustain fridge + lights + router during a multi-day outage.",
  heroTagline: { lineA: "2 kWh station.", lineB: "Twin panels." },
  heroMedia: { type: "image", src: "/media/side.webp" },
  highlights: [
    { stat: "2,048Wh", label: "Station capacity" },
    { stat: "440W", label: "Combined solar" },
    { stat: "$197", label: "Bundle savings" },
  ],
  features: [
    {
      id: "offgrid",
      eyebrow: "Full off-grid",
      title: "One sunny day. Refilled.",
      body:
        "440 W of sustained solar on a clear day refills the 2,048 Wh battery inside of a single daylight window. Pair with hybrid recharge (AC + solar) to hit 100% even faster when the grid comes back.",
      media: {
        type: "image",
        src: "/media/lifestyle.webp",
        alt: "VoltPak 2000 in a driveway with two solar panels",
      },
      tone: "dark",
    },
  ],
  inTheBox: [
    "VoltPak 2000 Power Station",
    "2 × Solar Panel 220W (foldable)",
    "AC charging cable",
    "Car charging cable",
    "2 × MC4 → SDC adapter",
    "Y-cable (parallel solar)",
    "2 × nylon carry case",
    "Quick-start bundle guide",
  ],
  specs: [
    {
      group: "Bundle contents",
      rows: [
        { label: "Station", value: "VoltPak 2000 · 2,048 Wh · 3,000 W AC" },
        { label: "Solar", value: "2 × Solar Panel 220W · 440 W combined" },
      ],
    },
    {
      group: "Fill-up time",
      rows: [
        { label: "Station from solar (peak sun)", value: "~5 hr" },
        { label: "Station from AC Turbo", value: "85 min" },
        { label: "Hybrid (AC + solar)", value: "70 min" },
      ],
    },
    {
      group: "Savings",
      rows: [
        { label: "Buy separately", value: "$2,397" },
        { label: "Bundle price", value: "$2,000" },
        { label: "You save", value: "$197" },
      ],
    },
  ],
  faq: [
    {
      q: "Can I run the two panels in series or parallel?",
      a: "Either. The included Y-cable puts them in parallel for higher current. Series is supported via MC4 for higher voltage - pick whichever best matches your MPPT window.",
    },
  ],
  certifications: VP2000.certifications,
  warranty: { unit: "5 years (station) / 2 years (panels)", battery: "3 years" },
  shipping: { usFreeOver: 100, intlAvailable: false },
};

// ──────────────────────────────────────────────────────────────
// Accessories
// ──────────────────────────────────────────────────────────────
const VP_CAR_CABLE: ProductDetail = {
  id: "vp-car-cable",
  shortDesc:
    "12 V car charging cable with SDC output. Fused, 6 ft, ships with every station but available as a spare.",
  longDesc:
    "A rugged 6 ft cable with a 12 V car plug on one end and an SDC connector on the other. Built-in 10 A fuse protects your vehicle and the station.",
  heroTagline: { lineA: "Top up.", lineB: "On the road." },
  heroMedia: { type: "image", src: "/media/front-ports.jpg" },
  highlights: [
    { stat: "12V → SDC", label: "Direct plug-in" },
    { stat: "6 ft", label: "Cable length" },
    { stat: "10 A fused", label: "Safety built in" },
  ],
  features: [],
  inTheBox: ["Car Charge Cable (12 V → SDC)", "Spare 10 A fuse"],
  specs: [
    {
      group: "Electrical",
      rows: [
        { label: "Input", value: "12 V DC car socket" },
        { label: "Output", value: "SDC (9–27 V, 10 A)" },
        { label: "Fuse", value: "10 A inline, replaceable" },
        { label: "Charging power", value: "120 W sustained" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Length", value: "6 ft (1.8 m)" },
        { label: "Cable gauge", value: "14 AWG silicone jacket" },
        { label: "Weight", value: "0.6 lb" },
      ],
    },
    {
      group: "Compatibility",
      rows: [
        { label: "VoltPak 1000 / 2000", value: "Yes, direct" },
        { label: "Other SDC devices", value: "Yes, within 9–27 V / 10 A window" },
      ],
    },
  ],
  faq: [
    {
      q: "Will it drain my car battery?",
      a: "Modern cars cut accessory power when the ignition is off, so no. When the engine's running it's pulling from the alternator, not the starting battery.",
    },
  ],
  certifications: ["FCC", "CE", "RoHS"],
  warranty: { unit: "1 year", battery: "N/A" },
  shipping: { usFreeOver: 100, intlAvailable: false },
  compatibleWith: ["vp-1000", "vp-2000"],
};

const VP_MC4_ADAPTER: ProductDetail = {
  id: "vp-mc4-adapter",
  shortDesc:
    "MC4 → SDC solar adapter. Use any third-party solar panel with any VoltPak station.",
  longDesc:
    "A short, sealed adapter cable that takes any MC4-ended solar panel on the market and plugs it into the VoltPak SDC input. Works with Renogy, Goal Zero, Jackery, BougeRV, Anker and countless others.",
  heroTagline: { lineA: "Any panel.", lineB: "Any VoltPak." },
  heroMedia: { type: "image", src: "/media/front-ports.jpg" },
  highlights: [
    { stat: "MC4 → SDC", label: "Universal solar" },
    { stat: "IP67", label: "Sealed connectors" },
    { stat: "30 A", label: "Max current" },
  ],
  features: [],
  inTheBox: ["MC4 → SDC Solar Adapter"],
  specs: [
    {
      group: "Electrical",
      rows: [
        { label: "Input (MC4)", value: "12–60 V DC" },
        { label: "Output (SDC)", value: "12–60 V, 30 A max" },
        { label: "Max power", value: "Up to 800 W per cable" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Length", value: "1 ft (300 mm)" },
        { label: "Cable gauge", value: "10 AWG" },
        { label: "IP rating", value: "IP67" },
      ],
    },
    {
      group: "Compatibility",
      rows: [
        { label: "VoltPak 1000 / 2000", value: "Yes, direct" },
        { label: "Any MC4 solar panel", value: "Yes" },
      ],
    },
  ],
  faq: [
    {
      q: "Do I need two for parallel panels?",
      a: "No. Use a standard MC4 Y-cable before the adapter to combine panels in parallel; one adapter then feeds the combined signal into SDC.",
    },
  ],
  certifications: ["FCC", "CE", "RoHS"],
  warranty: { unit: "1 year", battery: "N/A" },
  shipping: { usFreeOver: 100, intlAvailable: false },
  compatibleWith: ["vp-1000", "vp-2000"],
};

// ──────────────────────────────────────────────────────────────
// VoltPak VP-8000H - 3-in-1 hybrid solar system
// ──────────────────────────────────────────────────────────────
const VP_8000H: ProductDetail = {
  id: "vp-8000h",
  shortDesc:
    "8 kW hybrid inverter, 20 kWh LiFePO4 battery rack, and 530 W monocrystalline solar panels in a single procurement package — ~5 hours of backup at 50% load.",
  longDesc:
    "The VoltPak VP-8000H is a fully integrated hybrid solar energy system for residential and light-commercial power independence. It combines an 8 kW pure sine-wave hybrid inverter with dual MPPT, 20 kWh of rack-mounted LiFePO4 battery storage rated for 6,000+ cycles, and high-efficiency 530 W monocrystalline PERC solar panels — delivering seamless solar self-consumption, automatic grid failover, and remote monitoring via Wi-Fi, 4G, or Bluetooth.",
  heroTagline: { lineA: "Whole-home hybrid.", lineB: "One system." },
  heroMedia: { type: "image", src: "/media/vp8000h-hero.png" },
  highlights: [
    { stat: "8 kW", label: "Continuous AC output", note: "16 kW peak for 10 s" },
    { stat: "20 kWh", label: "LFP battery storage", note: "6,000+ cycles" },
    { stat: "97.6%", label: "Max inverter efficiency" },
  ],
  features: [
    {
      id: "inverter",
      eyebrow: "Dual-MPPT hybrid inverter",
      title: "8 kW. Two solar trackers.",
      body:
        "Two independent 6 kW MPPT channels accept up to 12 kW of PV across split roof orientations. 97.6% peak conversion efficiency. Grid-tied or off-grid — the inverter handles both modes and switches in under 20 ms during an outage.",
      media: {
        type: "image",
        src: "/media/vp8000h-inverter-side.png",
        alt: "VP-8000H hybrid inverter front and side view",
      },
      callouts: [
        { label: "Rated output", value: "8 kW / 8 kVA" },
        { label: "Peak (10 s)", value: "16 kW" },
        { label: "MPPT channels", value: "2 × 6 kW" },
      ],
      tone: "dark",
    },
    {
      id: "battery",
      eyebrow: "20 kWh rack-mounted LFP",
      title: "4 modules. 6,000 cycles.",
      body:
        "Four 5 kWh LiFePO4 modules in a floor-standing rack cabinet. Integrated smart BMS with cell-level balancing and CAN/RS485 communication for adaptive charge curves. 100% depth of discharge supported, 95%+ round-trip efficiency.",
      media: {
        type: "image",
        src: "/media/vp8000h-battery-module.png",
        alt: "LFP 51.2V 100Ah battery module close-up",
      },
      callouts: [
        { label: "Total capacity", value: "20 kWh" },
        { label: "Cycle life", value: "6,000+" },
        { label: "Round-trip eff.", value: "≥95%" },
      ],
    },
    {
      id: "solar",
      eyebrow: "530 W monocrystalline PERC",
      title: "21.5% efficiency. 25-year output warranty.",
      body:
        "144 half-cut monocrystalline PERC cells deliver 530 W per panel at 21.5% module efficiency. Anti-reflective tempered glass, IP68 junction box, and MC4 connectors. Rated for 2,400 Pa wind and 5,400 Pa snow loads.",
      media: {
        type: "image",
        src: "/media/vp8000h-inverter-front.png",
        alt: "VP-8000H system overview with inverter and panels",
      },
      callouts: [
        { label: "Panel output", value: "530 W" },
        { label: "Efficiency", value: "21.5%" },
        { label: "Hail rated", value: "25 mm @ 23 m/s" },
      ],
      tone: "dark",
    },
    {
      id: "monitoring",
      eyebrow: "Smart monitoring",
      title: "Wi-Fi. 4G. Bluetooth.",
      body:
        "Real-time system monitoring via mobile app and web portal. Track solar generation, battery state, grid consumption, and backup status from anywhere. CAN and RS485 interfaces support third-party energy management integration.",
      media: {
        type: "image",
        src: "/media/vp8000h-inverter-rear.png",
        alt: "VP-8000H inverter showing PV disconnect and connectivity ports",
      },
      callouts: [
        { label: "Connectivity", value: "Wi-Fi / 4G / BT" },
        { label: "Protocols", value: "CAN / RS485" },
        { label: "Transfer time", value: "<20 ms" },
      ],
    },
  ],
  inTheBox: [
    "VP-8000H Hybrid Inverter (8 kW)",
    "VP-BAT-20K Battery Rack (4 × 5 kWh LFP modules)",
    "VP-SP-530 Solar Panel(s) (530 W each)",
    "CAN / RS485 communication cables",
    "AC & DC wiring harnesses",
    "Mounting hardware (inverter wall-mount + panel rail kit)",
    "Installation manual & commissioning guide",
    "2-year warranty documentation",
  ],
  specs: [
    {
      group: "Hybrid Inverter (VP-8000H)",
      rows: [
        { label: "Rated output", value: "8,000 W / 8,000 VA" },
        { label: "Peak power (off-grid)", value: "16,000 W (2× rated, 10 s)" },
        { label: "Max efficiency", value: "97.6%" },
        { label: "Euro efficiency", value: "97.0%" },
        { label: "MPPT channels", value: "2 (2 strings each)" },
        { label: "Max PV input", value: "12,000 W" },
        { label: "PV voltage range", value: "120–500 V (max 550 V)" },
        { label: "Max PV current", value: "18 + 18 A" },
        { label: "Battery voltage range", value: "40–60 V (nominal 48 / 51.2 V)" },
        { label: "Max charge / discharge", value: "120 / 120 A" },
        { label: "AC output voltage", value: "220 / 230 V" },
        { label: "Max AC passthrough", value: "63 A" },
        { label: "THDi", value: "<3% of nominal" },
        { label: "Grid connection", value: "L + N + PE" },
        { label: "Transfer time", value: "<20 ms" },
      ],
    },
    {
      group: "Battery System (VP-BAT-20K)",
      rows: [
        { label: "Chemistry", value: "LiFePO4 (LFP)" },
        { label: "Nominal capacity", value: "20 kWh" },
        { label: "Nominal voltage", value: "51.2 V (48 V system)" },
        { label: "Voltage range", value: "44.8–57.6 V" },
        { label: "Configuration", value: "4 × 5 kWh modules (rack-mounted)" },
        { label: "Max charge / discharge", value: "200 / 200 A (10,240 W)" },
        { label: "Depth of discharge", value: "100% (recommended ≤80%)" },
        { label: "Cycle life", value: "≥6,000 @ 80% DoD, 25 °C" },
        { label: "Round-trip efficiency", value: "≥95%" },
        { label: "BMS", value: "Integrated smart — cell balancing, OCP/OVP/OTP/SCP" },
        { label: "Communication", value: "CAN 2.0 / RS485" },
      ],
    },
    {
      group: "Solar Panel (VP-SP-530)",
      rows: [
        { label: "Rated power", value: "530 W (STC)" },
        { label: "Efficiency", value: "21.5%" },
        { label: "Cell type", value: "Monocrystalline PERC, 144 half-cut" },
        { label: "Voc", value: "49.8 V" },
        { label: "Isc", value: "13.90 A" },
        { label: "Vmp", value: "41.5 V" },
        { label: "Imp", value: "12.78 A" },
        { label: "Max system voltage", value: "1,500 V DC" },
        { label: "Temp coefficient (Pmax)", value: "-0.35 %/°C" },
        { label: "Panel dimensions", value: "2,279 × 1,134 × 35 mm" },
        { label: "Panel weight", value: "28.5 kg" },
        { label: "Connector", value: "MC4-compatible" },
      ],
    },
    {
      group: "Protection & Safety",
      rows: [
        { label: "Inverter protections", value: "DC reverse polarity, OCP, OVP, OTP, SCP, anti-islanding, arc-fault, RCD" },
        { label: "Surge protection", value: "Type II (DC + AC)" },
        { label: "Inverter IP rating", value: "IP65" },
        { label: "Battery IP rating", value: "IP55" },
        { label: "Panel junction box", value: "IP68" },
      ],
    },
    {
      group: "Physical",
      rows: [
        { label: "Inverter dimensions", value: "456 × 750 × 268.5 mm" },
        { label: "Inverter weight", value: "52 kg" },
        { label: "Battery cabinet", value: "600 × 900 × 580 mm" },
        { label: "Battery weight", value: "≈240 kg" },
        { label: "Inverter cooling", value: "Intelligent air cooling" },
        { label: "Noise", value: "<60 dB" },
        { label: "Operating temp (inverter)", value: "-25 to +60 °C" },
        { label: "Operating temp (battery charge)", value: "0 to +55 °C" },
        { label: "Operating temp (battery discharge)", value: "-20 to +60 °C" },
      ],
    },
    {
      group: "Connectivity",
      rows: [
        { label: "Communication", value: "RS485 / RS232 / CAN" },
        { label: "Monitoring", value: "Wi-Fi / Bluetooth / 4G / LAN (optional)" },
        { label: "App", value: "Mobile app + web portal" },
      ],
    },
    {
      group: "Backup Performance",
      rows: [
        { label: "@ 50% load (4 kW)", value: "~5 hours" },
        { label: "@ 100% load (8 kW)", value: "~2.4 hours" },
        { label: "Charging", value: "Solar + grid hybrid, automatic priority" },
      ],
    },
  ],
  faq: [
    {
      q: "How long will the battery last during a power outage?",
      a: "At 50% load (4 kW — typical for fridge, lights, router, and a few circuits) the 20 kWh battery provides approximately 5 hours of backup. At full 8 kW load, expect about 2.4 hours.",
    },
    {
      q: "Can it go fully off-grid?",
      a: "Yes. The VP-8000H supports off-grid operation with automatic solar priority charging. The dual-MPPT inverter accepts up to 12 kW of PV input for fast daytime recharge.",
    },
    {
      q: "What does the 3-in-1 package include?",
      a: "The VP-8000H is a complete system: an 8 kW hybrid inverter, a 20 kWh rack-mounted LFP battery (4 × 5 kWh modules), and 530 W monocrystalline solar panels with all wiring and mounting hardware.",
    },
    {
      q: "Is professional installation required?",
      a: "Yes. The VP-8000H involves high-voltage AC/DC wiring and should be installed by a licensed electrician or certified solar installer. The system ships with a full commissioning guide.",
    },
    {
      q: "How many solar panels can the inverter handle?",
      a: "The dual-MPPT inverter supports up to 12 kW of PV across two independent 6 kW trackers, each with two string inputs. This allows split-orientation roof layouts.",
    },
    {
      q: "What's the battery warranty?",
      a: "2 years or 6,000 cycles, whichever comes first, with a guarantee of ≥70% retained capacity at end of warranty. The inverter and panels also carry 2-year product warranties, with the panels additionally warranting ≥80% output at year 25.",
    },
  ],
  certifications: [
    "CE",
    "IEC 61727",
    "IEC 62116",
    "IEC 62109-1/2",
    "EN 50549",
    "VDE-AR-N 4105",
    "IEC 61215",
    "IEC 61730",
    "RoHS",
  ],
  warranty: {
    unit: "2 years (inverter) / 2 years (battery) / 2 years product + 25 years output (panels)",
    battery: "2 years or 6,000 cycles (≥70% capacity)",
  },
  shipping: { usFreeOver: 500, intlAvailable: true },
};

// ──────────────────────────────────────────────────────────────
// Registry (keyed by product id from lib/products.ts)
// ──────────────────────────────────────────────────────────────
export const SPECS: Record<string, ProductDetail> = {
  "vp-1000": VP1000,
  "vp-2000": VP2000,
  "vp-1000-solar": VP_1000_SOLAR,
  "vp-2000-solar": VP_2000_SOLAR_KIT,
  "vp-battery-2k": VP_BATT_2K,
  "vp-solar-220": VP_SOLAR_220,
  "vp-solar-400": VP_SOLAR_400,
  "vp-car-cable": VP_CAR_CABLE,
  "vp-mc4-adapter": VP_MC4_ADAPTER,
  "vp-8000h": VP_8000H,
};

export const getSpecs = (id: string): ProductDetail | undefined => SPECS[id];
