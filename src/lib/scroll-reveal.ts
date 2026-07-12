import { animate, inView } from "motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DISTANCE = "16px";

function hide(el: HTMLElement) {
  el.style.opacity = "0";
  el.style.transform = `translateY(${DISTANCE})`;
}

function reveal(el: HTMLElement, delay = 0) {
  animate(el, { opacity: 1, y: 0 }, { duration: 0.6, ease: EASE, delay });
}

/**
 * Entradas por scroll (fade + translate curto) para elementos marcados com
 * data-reveal. Elementos dentro de um ancestral data-reveal-group animam em
 * cascata quando o grupo entra no viewport. Não roda com prefers-reduced-motion.
 */
export function initScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const groups = new Map<HTMLElement, HTMLElement[]>();
  const standalone: HTMLElement[] = [];

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const group = el.closest<HTMLElement>("[data-reveal-group]");
    if (group) {
      const list = groups.get(group) ?? [];
      list.push(el);
      groups.set(group, list);
    } else {
      standalone.push(el);
    }
  });

  standalone.forEach(hide);
  groups.forEach((els) => els.forEach(hide));

  standalone.forEach((el) => {
    const stop = inView(
      el,
      () => {
        reveal(el);
        stop();
      },
      { margin: "0px 0px -10% 0px" },
    );
  });

  groups.forEach((els, group) => {
    const stop = inView(
      group,
      () => {
        els.forEach((el, i) => reveal(el, i * 0.08));
        stop();
      },
      { margin: "0px 0px -10% 0px" },
    );
  });
}
