// Literal type

const userName1 = "Bob";
let userName2: string | number = "Sam";

userName2 = 3;

type Job = "police" | "developer" | "teacher";

interface LiteralUser {
  name: string;
  job: Job;
}

const literalUser: LiteralUser = {
  name: "Bob",
  job: "developer",
};

interface HighSchoolStudent {
  name: string;
  grade: 1 | 2 | 3;
}

// Union type
interface UnionCar {
  name: "car"; // 이렇게 바로 string 으로 초기화를 해주는 거야 -> 식별 가능한 유니온
  color: string;
  start(): void;
}

interface Mobile {
  name: "mobile";
  color: string;
  call(): void;
}

function getGift(gift: UnionCar | Mobile) {
  console.log(gift.color);
  if (gift.name === "car") {
    gift.start();
  } else {
    gift.call();
  }
}

// intersection type
interface intersectCar {
  name: string;
  start(): void;
}
interface Toy {
  name: string;
  color: string;
  price: number;
}
const toyCar: Toy & intersectCar = {
  name: "타요",
  color: "blue",
  start() {},
  price: 1000,
};
