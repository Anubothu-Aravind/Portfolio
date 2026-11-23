import Lenis from "lenis";
import { animate, inView, scroll, stagger } from "motion";

/*
 * One motion system for the site.
 * Rules (the web version of Reanimated's): only transform and opacity move,
 * springs are interruptible (a new animate() call picks up the current velocity),
 * nothing re-renders per frame, and everything stops under prefers-reduced-motion.
 */

export const SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 20 } as const;
export const SPRING_BOUNCY = { type: "spring", stiffness: 320, damping: 14 } as const;

/*
 * Easing, taken from the reference site's GSAP names and converted to cubic-beziers
 * (GSAP power1 = quad, power2 = cubic, power3 = quart, power4 = quint).
 */
export const EASE = {
  arrive: [0.16, 1, 0.3, 1], // expo.out
  settle: [0.25, 1, 0.5, 1], // power3.out
  leave: [0.5, 0, 0.75, 0], // power3.in
  travel: [0.83, 0, 0.17, 1], // power4.inOut
  draw: [0.45, 0, 0.55, 1], // power1.inOut
  slide: [0.33, 1, 0.68, 1], // power2.out
  glide: [0.45, 0, 0.12, 1], // their custom "glide": slow start, long soft landing
} as const;

/* Reference timings (seconds) */
export const T = {
  words: { duration: 0.7, stagger: 0.06, spread: 0.6, blur: 10 },
  cards: { y: 36, scale: 0.96, duration: 0.95, stagger: 0.09, spread: 0.7, row: 120 },
  glide: 0.9,
  speed: { px: 1400, most: 3.5 },
} as const;

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- smooth scroll (desktop pointer only; touch keeps native momentum) ---------- */

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/* ---------- scroll speed: fast scrollers get faster animations (like the reference) ---------- */

let speed = 0;
let lastScroll = { y: 0, t: 0 };
let speedWired = false;
const trackSpeed = () => {
  if (speedWired) return;
  speedWired = true;
  lastScroll = { y: window.scrollY, t: performance.now() };
  window.addEventListener(
    "scroll",
    () => {
      const now = { y: window.scrollY, t: performance.now() };
      const dt = Math.max(1, now.t - lastScroll.t);
      speed = speed * 0.6 + (Math.abs(now.y - lastScroll.y) / dt) * 1000 * 0.4;
      lastScroll = now;
    },
    { passive: true }
  );
};

/** How much faster a reveal should run: up to 3.5x when scrolling fast or when the section is already scrolled past. */
export const speedFactor = (el: Element) => {
  const past = Math.max(0, -el.getBoundingClientRect().top) / window.innerHeight;
  const recent = performance.now() - lastScroll.t < 150 ? speed : 0;
  return Math.min(T.speed.most, Math.max(1, recent / T.speed.px, 1 + past * 3));
};

/** Glide the page to y with the reference's 0.9s curve. */
export const glideTo = (y: number) =>
  new Promise<void>((done) => {
    if (lenis) {
      lenis.scrollTo(y, {
        duration: T.glide,
        easing: (t) => cubic(EASE.glide, t),
        lock: true,
        force: true,
        onComplete: () => done(),
      });
      return;
    }
    animate(window.scrollY, y, {
      duration: T.glide,
      ease: EASE.glide as unknown as [number, number, number, number],
      onUpdate: (v) => window.scrollTo(0, v),
    }).then(() => done());
  });

/** Jump without animation, keeping Lenis in sync. */
export const jumpTo = (y: number) => {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
};

// cubic-bezier evaluator for Lenis easing callbacks
const cubic = (p: readonly number[], t: number) => {
  const [x1, y1, x2, y2] = p;
  let u = t;
  for (let i = 0; i < 6; i++) {
    const x = 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u ** 2 * x2 + u ** 3 - t;
    const dx = 3 * (1 - u) ** 2 * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u ** 2 * (1 - x2);
    if (Math.abs(dx) < 1e-6) break;
    u = Math.min(1, Math.max(0, u - x / dx));
  }
  return 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u ** 2 * y2 + u ** 3;
};

export const smoothScroll = () => {
  trackSpeed();
  if (reducedMotion() || !finePointer()) return;
  if (lenis) {
    lenis.resize();
    return;
  }
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.11,
    wheelMultiplier: 1,
    anchors: { offset: -12 },
    prevent: (node) => Boolean(node.closest?.("[data-lenis-prevent]")),
  });
};

export const resetScroll = () => {
  lenis?.scrollTo(0, { immediate: true, force: true });
  lenis?.resize();
};

/* ---------- hero entrance + parallax ---------- */

export const heroMotion = () => {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero || hero.dataset.motion) return;
  hero.dataset.motion = "1";
  if (reducedMotion()) {
    hero.classList.add("is-ready");
    return;
  }

  const backdrop = hero.querySelector<HTMLElement>(".hero__backdrop");
  const sheet = hero.querySelector<HTMLElement>(".sheet");
  const chat = hero.querySelector<HTMLElement>(".hero__chat");
  const lines = hero.querySelectorAll<HTMLElement>(".sheet__note, .story");
  const portrait = hero.querySelector<HTMLElement>(".sticker--portrait");
  const baby = hero.querySelector<HTMLElement>(".sticker--baby");
  const ticker = hero.querySelector<HTMLElement>(".ticker");

  if (backdrop) animate(backdrop, { scale: [1.14, 1] }, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
  if (sheet) animate(sheet, { opacity: [0, 1], y: [56, 0] }, { ...SPRING, delay: 0.05 });
  if (chat) animate(chat, { opacity: [0, 1], x: [-40, 0] }, { ...SPRING, delay: 0.18 });
  animate(lines, { opacity: [0, 1], y: [22, 0] }, { ...SPRING, delay: stagger(0.09, { startDelay: 0.25 }) });
  // hand transforms back to CSS once the entrance lands, so hover and zoom states keep working
  const release = (el: HTMLElement) => () => {
    el.style.transform = "";
  };
  if (portrait) animate(portrait, { scale: [0.4, 1], rotate: [-40, -6] }, { ...SPRING_BOUNCY, delay: 0.3 }).then(release(portrait));
  if (baby) animate(baby, { scale: [0, 1], rotate: [30, 5] }, { ...SPRING_BOUNCY, delay: 0.7 }).then(release(baby));
  if (ticker) animate(ticker, { y: ["100%", "0%"] }, { ...SPRING, delay: 0.55 }).then(release(ticker));
  hero.classList.add("is-ready");

  if (backdrop) {
    scroll(animate(backdrop, { y: [0, 140], scale: [1, 1.08] }, { ease: "linear" }), {
      target: hero,
      offset: ["start start", "end start"],
    });
  }
};

/* ---------- headings: words sharpen out of a blur, one after another ---------- */

export const splitWords = (el: HTMLElement) => {
  if (el.dataset.split) return [...el.querySelectorAll<HTMLElement>(".w")];
  el.dataset.split = "1";
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(document.createTextNode(part));
          else {
            const w = document.createElement("span");
            w.className = "w";
            w.textContent = part;
            frag.append(w);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
    });
  };
  walk(el);
  return [...el.querySelectorAll<HTMLElement>(".w")];
};

export const wordsIn = (el: HTMLElement, at = 0) => {
  const words = splitWords(el);
  const each = Math.min(T.words.stagger, T.words.spread / Math.max(1, words.length - 1));
  return animate(
    words,
    { opacity: [0, 1], filter: [`blur(${T.words.blur}px)`, "blur(0px)"], y: [6, 0] },
    { duration: T.words.duration, ease: EASE.slide as unknown as [number, number, number, number], delay: stagger(each, { startDelay: at }) }
  );
};

/* ---------- section reveals: cards rise by row, headings un-blur ---------- */

const byRow = (els: HTMLElement[]) =>
  els
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .sort((a, b) => Math.round(a.r.top / T.cards.row) - Math.round(b.r.top / T.cards.row) || a.r.left - b.r.left)
    .map((x) => x.el);

export const reveals = () => {
  if (reducedMotion()) {
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => el.classList.add("is-in"));
    return;
  }

  document.querySelectorAll<HTMLElement>("[data-words]:not([data-revealed])").forEach((el) => {
    el.dataset.revealed = "1";
    splitWords(el);
    if (el.getBoundingClientRect().bottom < 0) {
      el.classList.add("is-in");
      return;
    }
    inView(
      el,
      () => {
        el.classList.add("is-in");
        const c = wordsIn(el);
        c.speed = speedFactor(el);
      },
      { amount: 0.4 }
    );
  });

  const groups = new Map<Element, HTMLElement[]>();
  document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
    const parent = el.parentElement ?? document.body;
    const list = groups.get(parent) ?? [];
    list.push(el);
    groups.set(parent, list);
  });

  groups.forEach((els) => {
    els.forEach((el) => (el.dataset.revealed = "1"));
    // anything already scrolled past (a refresh mid-page, a deep link) just shows
    if (els.every((el) => el.getBoundingClientRect().bottom < 0)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    // any member of the group entering view plays the whole group, once
    let played = false;
    const stop = inView(
      els,
      () => {
        if (played) return;
        played = true;
        stop();
        const ordered = byRow(els);
        const each = Math.min(T.cards.stagger, T.cards.spread / Math.max(1, ordered.length - 1));
        ordered.forEach((el) => el.classList.add("is-in"));
        const c = animate(
          ordered,
          { opacity: [0, 1], y: [T.cards.y, 0], scale: [T.cards.scale, 1] },
          { duration: T.cards.duration, ease: EASE.arrive as unknown as [number, number, number, number], delay: stagger(each) }
        );
        c.speed = speedFactor(els[0]);
      },
      { amount: 0.12 }
    );
  });
};

/* ---------- 3D tilt on cards (fine pointers only) ---------- */

export const tilt = (selector: string, max = 6) => {
  if (reducedMotion() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>(`${selector}:not([data-tilt])`).forEach((card) => {
    card.dataset.tilt = "1";
    card.style.transformPerspective = "900px";
    card.addEventListener("pointerenter", () => {
      animate(card, { y: -6, scale: 1.01 }, SPRING);
    });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      animate(card, { rotateY: px * max * 2, rotateX: -py * max * 2 }, SPRING);
    });
    card.addEventListener("pointerleave", () => {
      animate(card, { rotateX: 0, rotateY: 0, y: 0, scale: 1 }, SPRING_SOFT);
    });
    card.addEventListener("pointerdown", () => animate(card, { scale: 0.98 }, SPRING));
    card.addEventListener("pointerup", () => animate(card, { scale: 1.01 }, SPRING));
  });
};

/* ---------- stagger a freshly shown panel ---------- */

export const staggerIn = (els: NodeListOf<HTMLElement> | HTMLElement[]) => {
  if (reducedMotion() || !els.length) return;
  animate(els, { opacity: [0, 1], y: [24, 0], scale: [0.98, 1] }, { ...SPRING, delay: stagger(0.05) });
};

export { animate, scroll, inView, stagger };
