import { animate, stagger, EASE, reducedMotion, getLenis, jumpTo } from "./motion";

/*
 * Scroll "gate", modelled on the reference site's behaviour:
 *  - Wheel input is grouped into gestures (a new one after a 160ms gap or a direction change).
 *    A gesture must travel 36px before it acts, and acts once, so trackpad inertia can't double-fire.
 *  - At the hero, scrolling down plays a choreographed hand-off: the chat and story leave,
 *    the paper sheet grows to fill the screen, and the page lands on the work section.
 *    Scrolling up from the top of work plays it backwards.
 *  - Everywhere else, scrolling is untouched. (The timeline below pins and steps through its
 *    chapters with plain scrolling, so it needs no glide of its own, in either direction.)
 */

type Ease = [number, number, number, number];
const e = (k: keyof typeof EASE) => EASE[k] as unknown as Ease;

const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const CFG = { gapMs: 160, travel: 36, minWidth: 1000 };
const OUT = { duration: 0.42, stagger: 0.03, copyOut: 0.5, copyStagger: 0.025, growAt: 0.12, grow: 0.78, handover: 0.86, fadeOut: 0.32 };
const IN = { shrink: 0.8, copyInAt: 0.3, copyIn: 0.85, copyStagger: 0.04 };

export const initGate = () => {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const work = document.querySelector<HTMLElement>("#work");
  const veil = document.querySelector<HTMLElement>("[data-gate-veil]");
  if (!hero || !work || !veil || hero.dataset.gate) return;
  hero.dataset.gate = "1";
  if (reducedMotion()) return;

  const enabled = () => window.innerWidth >= CFG.minWidth;
  const sheet = hero.querySelector<HTMLElement>(".sheet")!;
  const chatParts = () => [...hero.querySelectorAll<HTMLElement>(".chat__head, .chat__log > *, .chat__composer")];
  const copyParts = () => [...hero.querySelectorAll<HTMLElement>(".sheet__note, .sheet__story > *, .ticker")];
  const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

  let busy = false;
  let heroHidden = false;

  const sheetClip = () => {
    const r = sheet.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return `inset(${r.top}px ${vw - r.right}px ${vh - r.bottom}px ${r.left}px round 28px)`;
  };
  const FULL = "inset(0px 0px 0px 0px round 0px)";

  const showHero = () => {
    [...chatParts(), ...copyParts()].forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    heroHidden = false;
  };

  // Always hand scrolling back, even if a transition is cut short (navigation, a thrown error)
  const release = () => {
    veil.style.visibility = "hidden";
    getLenis()?.start();
    busy = false;
  };

  // Where the hero's last screen begins: on short screens the hero is taller than the viewport
  const heroEnd = () => Math.max(0, top(work) - window.innerHeight);

  /* hero -> work */
  const down = async () => {
    busy = true;
    getLenis()?.stop();
    try {
      const clip = sheetClip();
      animate(chatParts().reverse(), { opacity: 0, y: -28 }, { duration: OUT.duration, ease: e("leave"), delay: stagger(OUT.stagger) });
      animate(copyParts(), { opacity: 0, y: -36 }, { duration: OUT.copyOut, ease: e("leave"), delay: stagger(OUT.copyStagger, { startDelay: 0.06 }) });
      heroHidden = true;

      veil.style.clipPath = clip;
      veil.style.visibility = "visible";
      veil.style.opacity = "1";
      await animate(
        veil,
        { clipPath: [clip, FULL], backgroundColor: [token("--card"), token("--paper")] },
        { duration: OUT.grow, ease: e("travel"), delay: OUT.growAt }
      );
      jumpTo(top(work));
      showHero();
      await animate(veil, { opacity: [1, 0] }, { duration: OUT.fadeOut, ease: e("settle") });
    } finally {
      showHero();
      release();
    }
  };

  /* work -> hero (lands on the hero's last screen, so nothing above it is skipped on short screens) */
  const up = async () => {
    busy = true;
    getLenis()?.stop();
    try {
      veil.style.clipPath = FULL;
      veil.style.backgroundColor = token("--paper");
      veil.style.opacity = "1";
      veil.style.visibility = "visible";
      const parts = [...copyParts(), ...chatParts()];
      parts.forEach((el) => (el.style.opacity = "0"));
      jumpTo(heroEnd());
      await new Promise(requestAnimationFrame);
      const clip = sheetClip();
      animate(
        copyParts(),
        { opacity: [0, 1], y: [24, 0] },
        { duration: IN.copyIn, ease: e("arrive"), delay: stagger(IN.copyStagger, { startDelay: IN.copyInAt + 0.2 }) }
      );
      animate(chatParts(), { opacity: [0, 1], y: [18, 0] }, { duration: 0.6, ease: e("arrive"), delay: stagger(0.03, { startDelay: IN.copyInAt + 0.3 }) });
      await animate(veil, { clipPath: [FULL, clip], backgroundColor: [token("--paper"), token("--card")] }, { duration: IN.shrink, ease: e("travel") });
      await animate(veil, { opacity: 0 }, { duration: 0.18 });
    } finally {
      showHero();
      release();
    }
  };

  /* what should a gesture in this direction do from here? */
  const decide = (dir: number): (() => Promise<void>) | null => {
    if (!enabled()) return null;
    const y = window.scrollY;
    const w = top(work);
    const end = heroEnd();
    // down: only from the hero's last screen, so taller heroes scroll normally until their end
    if (dir > 0 && y < w - 4) return y >= end - 2 ? down : null;
    // up: only from the top of work, or when the hero is at most half on screen; higher up it's a normal scroll
    if (dir < 0 && y > Math.max(end + 2, w - window.innerHeight / 2) && y <= w + 4) return up;
    return null;
  };

  /* wheel gestures */
  const g = { at: 0, dir: 0, travel: 0, spent: false };
  const onWheel = (ev: WheelEvent) => {
    if (ev.ctrlKey) return;
    const target = ev.target as HTMLElement | null;
    if (target?.closest?.("[data-lenis-prevent]")) return;
    const delta = ev.deltaMode === 1 ? ev.deltaY * 16 : ev.deltaMode === 2 ? ev.deltaY * window.innerHeight : ev.deltaY;
    const dir = Math.sign(delta);
    if (!dir) return;
    const now = performance.now();
    if (now - g.at > CFG.gapMs || dir !== g.dir) Object.assign(g, { dir, travel: 0, spent: false });
    g.at = now;

    if (busy || g.spent) {
      if (busy || decide(dir)) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
      return;
    }
    const action = decide(dir);
    if (!action) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    g.travel += Math.abs(delta);
    if (g.travel < CFG.travel) return;
    g.spent = true;
    action();
  };

  /* keyboard: arrows, page keys and space do the same */
  const onKey = (ev: KeyboardEvent) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const t = ev.target as HTMLElement;
    if (t.closest("input, textarea, select, [contenteditable='true']")) return;
    let dir = 0;
    if (ev.key === "ArrowDown" || ev.key === "PageDown") dir = 1;
    else if (ev.key === "ArrowUp" || ev.key === "PageUp") dir = -1;
    else if (ev.key === " " && !t.closest("button, a, [role='button'], [role='tab']")) dir = ev.shiftKey ? -1 : 1;
    if (!dir) return;
    if (busy) {
      ev.preventDefault();
      return;
    }
    const action = decide(dir);
    if (!action) return;
    ev.preventDefault();
    if (!ev.repeat) action();
  };

  /* if someone drags the scrollbar back into the hero mid-hand-off, never leave it blank */
  const onScroll = () => {
    if (!busy && heroHidden && window.scrollY < top(work) - 4) showHero();
  };

  window.addEventListener("wheel", onWheel, { passive: false, capture: true });
  window.addEventListener("keydown", onKey);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener(
    "astro:before-swap",
    () => {
      // leaving mid-transition must never strand the next page with scrolling stopped
      showHero();
      release();
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    },
    { once: true }
  );
};
