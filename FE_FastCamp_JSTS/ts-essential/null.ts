// let myname: string = null; // tsconfig에서 strict:true 옵션 켜져 있으면 에러나

// let u: undefined = null;

let v: void = undefined; // 여기에는 null, void 안돼. undefined만 값을 넣어줄 수 있음

let union: string | null = null; // 문자열도 넣을 수 있고, null도 넣을 수 있다

union = "Mark";