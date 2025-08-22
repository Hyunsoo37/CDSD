/* DOM이 완전히 로드되었을 때 실행 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 완전히 로드됨");

  /* 타이핑 애니메이션 설정 */
  const typingText = document.getElementById("typing-text");
  const textToType = "Welcome to CDSD";
  let index = 0;

  function type() {
    if (index < textToType.length) {
      typingText.textContent = textToType.substring(0, index + 1);
      index++;
      setTimeout(type, 100);
    } else {
      typingText.classList.remove("typing");
    }
  }

  /* 타이핑 애니메이션 시작 */
  typingText.classList.add("typing");
  type();

  /* 섹션 스크롤 애니메이션 */
  const sections = document.querySelectorAll(".section, .subsection");
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  /* 내비게이션 링크 스크롤 */
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth",
      });
      /* 모바일 메뉴 닫기 */
      document.querySelector(".nav-links").classList.remove("active");
    });
  });

  /* 햄버거 메뉴 토글 */
  const hamburger = document.querySelector(".hamburger");
  const navLinksContainer = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    /* 서브 메뉴도 함께 토글 */
    document.querySelectorAll(".nav-sub-links").forEach((subMenu) => {
      subMenu.classList.toggle(
        "active",
        navLinksContainer.classList.contains("active")
      );
    });
  });

  /* 외부 클릭 시 메뉴 닫기 */
  document.addEventListener("click", (e) => {
    if (
      !hamburger.contains(e.target) &&
      !navLinksContainer.contains(e.target)
    ) {
      navLinksContainer.classList.remove("active");
      document.querySelectorAll(".nav-sub-links").forEach((subMenu) => {
        subMenu.classList.remove("active");
      });
    }
  });

  /* 서브 메뉴 위치 동적 조정 */
  function positionSubMenus() {
    document.querySelectorAll(".nav-links li").forEach((li) => {
      const subMenu = li.querySelector(".nav-sub-links");
      if (subMenu) {
        const link = li.querySelector("a");
        const rect = link.getBoundingClientRect();
        subMenu.style.left = `${rect.left}px`;
      }
    });
  }

  /* 초기 위치 설정 및 창 크기 변경 시 재조정 */
  positionSubMenus();
  window.addEventListener("resize", positionSubMenus);
});
