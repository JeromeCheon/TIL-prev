interface GenericMobile<T> {
  name: string;
  price: number;
  option: T;
}

// const m1: GenericMobile<object> = { // or
const m1: GenericMobile<{ color: string; coupon: boolean }> = {
  name: "s21",
  price: 1000,
  option: {
    color: "red",
    coupon: false,
  },
};

const m2: GenericMobile<string> = {
  name: "s20",
  price: 1100,
  option: "good",
};
