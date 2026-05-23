export function initMeow(): void {
  const audio = document.getElementById(
    "meow-audio",
  ) as HTMLAudioElement | null;
  if (!audio) return;

  function playMeow(): void {
    try {
      audio.currentTime = 0;
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {}
  }

  document.querySelectorAll("[data-meow]").forEach((el) => {
    el.addEventListener("click", playMeow);
    el.addEventListener("keydown", (e) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        playMeow();
      }
    });
  });
}
