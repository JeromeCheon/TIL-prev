// 실패하거나 성공했을 때 각각 다른 값을 가지는 자료구조
// 에러를 값으로 다루자
// Option에서 some과 none으로 처리했던 것 처럼 try에서도 success/failed 처리하게.

type Success<R> = {
  readonly _tag: "success"; // 불변성 -> 참조 투명성 연관
  readonly result: R;
};

type Failed<E> = {
  readonly _tag: "failed";
  readonly error: E;
};

export type Try<R, E> = Success<R> | Failed<E>;

export const success = <R>(result: R): Try<R, never> => ({
  _tag: "success",
  result,
});

export const failed = <E>(error: E): Try<never, E> => ({
  _tag: "failed",
  error,
});

export const isSuccess = <R>(ta: Try<R, unknown>): ta is Success<R> =>
  ta._tag === "success";

export const isFailed = <E>(ta: Try<unknown, E>): ta is Failed<E> =>
  ta._tag === "failed";

export const getOrElse = <R, E>(
  ta: Try<R, E>,
  defaultValue: (e: E) => R
): R => {
  // 에러가 있을 경우 기본 값을 사용
  if (isFailed(ta)) return defaultValue(ta.error);
  // 결과가 성공이라면 해당 값을 사용
  return ta.result;
};
