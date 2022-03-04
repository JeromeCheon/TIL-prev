type HelloFunctionGenenric1 = <T>(message: T) => T;

const helloFunctionGenenric1: HelloFunctionGenenric1 = <T>(message: T): T => {
	return message;
};

interface HelloFunctionGenenric2 {
	<T>(message: T): T;
}

const helloFunctionGenenric2: HelloFunctionGenenric2 = <T>(message: T): T => {
	return message;
};
