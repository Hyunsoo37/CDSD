/* 페이지 로드 완료 시 실행 */
document.addEventListener("DOMContentLoaded", () => {
  /* 타이핑 애니메이션 */
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

  /* 섹션 드러내기 효과 */
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

  /* 모바일 메뉴 토글 */
  const nav = document.querySelector("nav");
  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");

  function closeMenu() {
    if (!nav || !links || !burger) return;
    links.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (burger && links && nav) {
    burger.addEventListener("click", () => {
      const opened = links.classList.toggle("active");
      burger.setAttribute("aria-expanded", String(opened));
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
});
