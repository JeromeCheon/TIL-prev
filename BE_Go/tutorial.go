package main

import (
	"fmt"
	"os"
)

func sum(nums ...int) int {
	sum := 0

	fmt.Printf("nums 타입: %T\n", nums)
	for _, v := range nums {
		sum += v
	}
	return sum
}

// 함수 타입 변수 예제
func add(a, b int) int {
	return a + b
}

func mult(a, b int) int {
	return a * b
}

// func(int, int) int 이게 반환타입이고 이걸 함수 타입 정의라고 해
// 함수 정의는 일반적으로 긴데 별칭 타입을 써서 함수 정의를 짧게 줄일 수 있음
// type opFunc func (int, int) int
func getOperator(op string) func(int, int) int {
	if op == "+" {
		return add
	} else if op == "*" {
		return mult
	} else {
		return nil
	}
}

// 함수 리터럴 사용
// type opFunc func(a, b int) int

// func getOperator(op string) opFunc {
// 	if op == "+" {
// 		return func(a, b int) int {
// 			return a + b
// 		}
// 	} else if op == "*" {
// 		return func(a, b int) int {
// 			return a * b
// 		}
// 	} else {
// 		return nil
// 	}
// }

func CaptureLoop() {
	f := make([]func(), 3)
	fmt.Println("ValueLoop")
	for i := 0; i < 3; i++ {
		// 참조값 i의 마지막인 i=3 기준으로 함수 리터럴 슬라이스가 업데이트됨
		f[i] = func() {
			fmt.Println(i)
		}
	}
	for i := 0; i < 3; i++ {
		f[i]()
	}
}
func CaptureLoop2() {
	f := make([]func(), 3)
	fmt.Println("ValueLoop2")
	for i := 0; i < 3; i++ {
		v := i
		f[i] = func() {
			fmt.Println(v)
		}
	}
	for i := 0; i < 3; i++ {
		f[i]()
	}
}

func main() {
	fmt.Println(sum(1, 2, 3, 4, 5))
	fmt.Println(sum(10, 20))
	fmt.Println(sum())

	f, err := os.Create("test.txt")
	if err != nil {
		fmt.Println("Failed to create a file")
		return
	}

	defer fmt.Println("반드시 호출됨")
	defer f.Close()
	defer fmt.Println("파일을 닫았습니다.")

	fmt.Println("파일에 Hello world를 씁니다.")
	fmt.Fprintln(f, "Hello World")

	// int 타입 인수 2개를 받아서 int 타입을 반환하는 함수 타입 변수
	var operator func(int, int) int
	operator = getOperator("*")

	var result = operator(3, 4)
	fmt.Println("연산 결과는 ", result)

	CaptureLoop()
	CaptureLoop2()
}
