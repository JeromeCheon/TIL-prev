// 순수한 에러
console.clear();

const tenDivideBy = (n: number): number => {
  // 인자로 number 가 들어오는 데 0이 오면 안되겠지?
  // 예외처리를 위해 throw 써주자
  if (n === 0) {
    throw new Error("0으로 나눌 수 없음");
  }
  return 10 / n;
};
const test = () => {
  try {
    const y = tenDivideBy(0);
    // 근데 만약 이 y가 try 이전에 위치한다면?
    // 아래 프로그램 종료 콘솔은 실행되지 않고 바로 에러로 넘어갈 것
    return y;
  } catch (e) {
    return 1;
  }
};

export const main3 = () => {
  const x = test();
  console.log(x);
  console.log("프로그램 종료!");
};
