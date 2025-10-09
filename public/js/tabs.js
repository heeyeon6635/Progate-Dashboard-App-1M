// 함수 정의
export function setupTabs() {
  // HTML 각 세션에 대한 DOM요소 취득
  const homeLink = document.querySelector('[data-tab="home"]'); // 홈 링크
  const converterTab = document.querySelector('[data-tab="converter"]'); // 단위변환 탭
  const flashcardsTab = document.querySelector('[data-tab="flashcards"]'); // 암기카드 탭
  const homeSection = document.getElementById("home"); // 홈 섹션
  const converterSection = document.getElementById("converter"); // 단위변환 섹션
  const flashcardsSection = document.getElementById("flashcards"); // 암기카드 섹션

  // 취득한 DOM요소를 사용하여 항목 클릭 시, 이벤트 처리
  homeLink.addEventListener("click", () => {
    converterSection.classList.add("hidden");
    flashcardsSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  });

  converterTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    flashcardsSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });

  flashcardsTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    converterSection.classList.add("hidden");
    flashcardsSection.classList.remove("hidden");
  });
}
