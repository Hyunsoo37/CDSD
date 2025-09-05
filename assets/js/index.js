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
    links.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (burger && links && nav) {
    burger.addEventListener("click", () => {
      const opened = links.classList.toggle("active");
      burger.setAttribute("aria-expanded", String(opened));
      document.body.style.overflow = opened ? "hidden" : "";
    });

    /* 모바일: 드롭다운 메뉴 토글 */
    links.querySelectorAll("li").forEach((li) => {
      const link = li.querySelector("a");
      const dropdown = li.querySelector(".dropdown");
      if (link && dropdown) {
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 430) {
            e.preventDefault();
            const isActive = li.classList.toggle("active");
            dropdown.style.display = isActive ? "block" : "none";
            links.querySelectorAll("li").forEach((otherLi) => {
              if (otherLi !== li) {
                otherLi.classList.remove("active");
                const otherDropdown = otherLi.querySelector(".dropdown");
                if (otherDropdown) otherDropdown.style.display = "none";
              }
            });
          }
        });
      }
    });

    links
      .querySelectorAll(".dropdown a")
      .forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && links.classList.contains("active"))
        closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* 드롭다운 메뉴: 단어 단위로 세로 줄바꿈 */
  document.querySelectorAll(".dropdown a").forEach((a) => {
    const t = a.textContent.trim().replace(/\s+/g, " ");
    if (!a.dataset.verticalized) {
      a.innerHTML = t.split(" ").join("<br>");
      a.dataset.verticalized = "1";
    }
  });
});
