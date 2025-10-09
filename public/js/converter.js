// 단위변환 로직 구현
export function setupConverter() {
  // HTML 내 요소 가져오기
  const converterForm = document.querySelector(".converter-form");
  const inputValue = document.querySelector(".converter-input");
  const fromUnit = document.querySelector(".converter-from");
  const toUnit = document.querySelector(".converter-to");
  const result = document.querySelector(".converter-result");

  // 변환에 필요한 단위와 그 기준값을 오브젝트로 정의
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 }, 
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 }
  ];

  // 셀렉트 박스에 단위 선택지를 추가
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  // 배열을 루프 처리
  for (const unit of lengthUnit) {
    fromUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
    toUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
  }

  // 最初のオプションを選択
  if (fromUnit.options.length > 0) {
    fromUnit.selectedIndex = 0;
  }
  if (toUnit.options.length > 0) {
    toUnit.selectedIndex = 1;
  }

  // 変換を実行; 입력값을 바탕으로 단위를 변환하는 함수를 작성
  function convert() {
    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {
      result.textContent = "Please enter a valid number";
      return;
    }

    const fromBase = fromUnit.value;
    const toBase = toUnit.value;
    const converted = (value * fromBase) / toBase;

    // 結果を3桁まで丸める
    result.textContent = `${value} ${lengthUnit[fromUnit.selectedIndex].name} = ${converted.toFixed(3)} ${lengthUnit[toUnit.selectedIndex].name}`;
  }

  // 폼의 입력이나 선택이 변경되었을 때로 변환하도록 설정
  // Input 이벤트 리스너에 의해, 입력 값이나 셀렉트 박스의 선택이 변경될 때마다 convert함수 실행
  converterForm.addEventListener("input", convert);
  // 初期化; 페이지 불러올 때 초기값으로 변환하기 때문에, convert 함수를 한 번 호출합니다
  convert(); // 初期値で変換を実行
}
