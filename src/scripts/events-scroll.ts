export function initEventsScroll(): void {
  const scrollContainer = document.getElementById("events-scroll-container");
  const track = document.getElementById("events-track");
  if (!scrollContainer || !track) return;

  const originalCards = Array.from(track.children) as HTMLElement[];
  originalCards.forEach((card) => track.appendChild(card.cloneNode(true)));
  originalCards.forEach((card) => track.appendChild(card.cloneNode(true)));

  const arrow = document.getElementById("arrow");

  let autoScrollInterval: ReturnType<typeof setInterval> | undefined;
  let isJumping = false;

  arrow?.addEventListener("click", () => {
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
  });

  function getSetWidth(): number {
    return track.scrollWidth / 3;
  }

  requestAnimationFrame(() => {
    scrollContainer.scrollLeft = getSetWidth();
  });

  scrollContainer.addEventListener("scroll", () => {
    if (isJumping) return;

    const setWidth = getSetWidth();

    if (scrollContainer.scrollLeft <= setWidth * 0.5) {
      isJumping = true;
      scrollContainer.style.scrollSnapType = "none";
      scrollContainer.scrollLeft += setWidth;

      requestAnimationFrame(() => {
        scrollContainer.style.scrollSnapType = "";
        isJumping = false;
      });
    } else if (scrollContainer.scrollLeft >= setWidth * 2.5) {
      isJumping = true;
      scrollContainer.style.scrollSnapType = "none";
      scrollContainer.scrollLeft -= setWidth;

      requestAnimationFrame(() => {
        scrollContainer.style.scrollSnapType = "";
        isJumping = false;
      });
    }
  });

  function startAutoScroll(): void {
    autoScrollInterval = setInterval(() => {
      const cardWidth = originalCards[0]?.offsetWidth ?? 0;
      const gap = window.innerWidth > 768 ? 48 : 24;

      scrollContainer.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
    }, 6000);
  }

  function stopAutoScroll(): void {
    if (autoScrollInterval !== undefined) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = undefined;
    }
  }

  scrollContainer.addEventListener("mouseenter", stopAutoScroll);
  scrollContainer.addEventListener("mouseleave", startAutoScroll);
  scrollContainer.addEventListener("touchstart", stopAutoScroll, {
    passive: true,
  });
  scrollContainer.addEventListener("touchend", startAutoScroll);

  startAutoScroll();
}
