document.addEventListener("DOMContentLoaded", () => {
  /* typing */
  const typingText = document.getElementById("typing-text");
  const text = "Welcome to CDSD";
  let i = 0;
  (function type() {
    if (!typingText) return;
    if (i < text.length) {
      typingText.textContent = text.slice(0, i + 1);
      i++;
      setTimeout(type, 100);
    }
  })();

  /* reveal */
  const targets = document.querySelectorAll(".section, .subsection");
  const io = new IntersectionObserver(
    (es, obs) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  targets.forEach((t) => io.observe(t));

  /* mobile menu */
  const nav = document.querySelector("nav");
  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");

  function closeMenu() {
    if (!nav || !links || !burger) return;
    links.classList.remove("active");
    nav.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (burger && links && nav) {
    burger.addEventListener("click", () => {
      const opened = links.classList.toggle("active");
      burger.setAttribute("aria-expanded", String(opened));
      nav.classList.toggle("menu-open", opened); // 모바일에서 전역 드롭다운 표시
      document.body.style.overflow = opened ? "hidden" : "";
    });

    links
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && links.classList.contains("active"))
        closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ===== 드롭다운: 단어 단위로 세로 줄바꿈 ===== */
  document.querySelectorAll(".nav-mega .mega-grid a").forEach((a) => {
    const t = a.textContent.trim().replace(/\s+/g, " ");
    if (!a.dataset.verticalized) {
      a.innerHTML = t.split(" ").join("<br>");
      a.dataset.verticalized = "1";
    }
  });
});
