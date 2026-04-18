"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal initializer.
 *
 * Our `.reveal` utility starts VISIBLE in CSS - the `html.has-js`
 * class (set synchronously in <head>) opts the document into the
 * hidden-until-observed state.  This component then progressively
 * reveals each element as it enters the viewport.
 *
 * IMPORTANT: this lives in the root layout, which persists across
 * client-side navigations.  Without a route-aware dependency the
 * effect would only run on the very first mount - every subsequent
 * page would render its `.reveal` elements hidden with no observer
 * attached.  Keying the effect on `usePathname()` re-initializes
 * the observer whenever the route changes.
 *
 * Safety nets, in order:
 *   1. If IntersectionObserver is unavailable → reveal everything.
 *   2. On mount, immediately reveal anything already on-screen
 *      (even partially), so nothing above the fold ever looks
 *      broken while the observer warms up.
 *   3. A 2.5s fallback force-reveals any remaining hidden elements
 *      in case the observer never fires (Chrome variants, iframed
 *      viewports with odd root rects, etc.).
 */
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Let the new route's DOM commit before we query.  Two rAFs is a
    // common, cheap idiom for "after the next paint".
    let raf1 = 0;
    let raf2 = 0;
    let timeout = 0;
    let io: IntersectionObserver | null = null;

    const init = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
      );

      if (els.length === 0) return;

      // Safety net #1: no IO support - show everything.
      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      // Safety net #2: reveal anything already visible on mount.
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add("is-visible");
        }
      });

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      els.forEach((el) => {
        if (!el.classList.contains("is-visible")) io!.observe(el);
      });

      // Safety net #3: belt-and-braces - reveal anything still hidden
      // after 2.5s regardless of scroll position.
      timeout = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
          .forEach((el) => el.classList.add("is-visible"));
      }, 2500);
    };

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(init);
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      if (timeout) window.clearTimeout(timeout);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return null;
}
