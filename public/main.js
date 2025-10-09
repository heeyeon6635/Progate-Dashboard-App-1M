// 함수 임포트
import { setupTabs } from "./js/tabs.js";
import { setupConverter } from "./js/converter.js";
import { setupFlashcards } from "./js/flashcards.js";

// 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupConverter();
  setupFlashcards();
});
