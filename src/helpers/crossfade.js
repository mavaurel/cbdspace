import { quintOut } from "svelte/easing";
import { crossfade } from "svelte/transition";
const [send, receive] = crossfade({
  duration: d => Math.sqrt(d * 300),
  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    return {
      duration: 1600,
      easing: quintOut,
      css: t => `
                transform: translateY(${t * 200}px);
                opacity: ${t}
            `
    };
  }
});

export { send, receive };
