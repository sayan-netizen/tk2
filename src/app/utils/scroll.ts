export const scrollToTop = () => {
  if (typeof window === "undefined") return;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const resetScroll = () => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  resetScroll();

  requestAnimationFrame(() => {
    resetScroll();
    requestAnimationFrame(() => {
      resetScroll();
      document.documentElement.style.scrollBehavior = "";
    });
  });

  [10, 30, 80, 150, 300, 500].forEach((delay) => {
    setTimeout(() => {
      resetScroll();
      document.documentElement.style.scrollBehavior = "";
    }, delay);
  });
};
