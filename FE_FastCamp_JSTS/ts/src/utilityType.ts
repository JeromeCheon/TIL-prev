// keyof

interface UtilUser {
  id: number;
  name: string;
  age: number;
  gender: "m" | "f";
}

type UserKey = keyof User;

const uk: UserKey = "age";

// partial<T> => 부분 property도 받겠다 하는 util 타입
let admin: Partial<UtilUser> = {
  // 이렇게 partial로 감싸주면 에러가 사라져.
  id: 1,
  name: "bob",
};
/* 이는 곳 이렇게 사용한 것과 같아
interface UtilUser {
  id?: number;
  name?: string;
  age?: number;
  gender?: "m" | "f";
}

*/

// Required<T> => 이 때는 interface에 ? 옵션이 있다해도 무조건 넣게 해야해

// Readonly<T> => 처음 할당만 가능하고 수정 불가

// Record<K, T> => key와 Type

type UtilGrade = "1" | "2" | "3" | "4";
type UtilScore = "A" | "B" | "C" | "D";

const utilScore: Record<UtilGrade, UtilScore> = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};
// Pick<T, K>
const utilPick: Pick<UtilUser, "id" | "name"> = {
  id: 0,
  name: "bob",
};
// Omit<T, K>
const utilOmit: Omit<UtilUser, "age" | "gender"> = {
  id: 0,
  name: "bob",
};
// Exclude<T1, T2> T1에서 T2 타입과 겹치는 걸 제거함
