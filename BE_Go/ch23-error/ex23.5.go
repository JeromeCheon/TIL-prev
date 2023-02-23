package main

import "fmt"

func divide(a, b int) {
	if b == 0 {
		panic("b=0. 0으로 나눌 수 없습니다.")
	}
	fmt.Printf("%d / %d = %d\n", a, b, a/b)
}

func f() {
	fmt.Println("f() 함수 시작")
	defer func() { // 패닉이 f까지 전파됐으나 defer 사용해서 함수 종료 전 함수 리터럴 실행
		if r := recover(); r != nil {
			fmt.Println("panic  복수 -", r)
		}
	}()

	g()
	fmt.Println("f() 함수 끝")
}

func g() {
	fmt.Printf("9 / 3 = %d\n", h(9, 3))
	fmt.Printf("9 / 0 = %d\n", h(9, 0))
}

func h(a, b int) int {
	if b == 0 {
		panic("제수는 0일 수 없음")
	}
	return a / b
}

func main() {
	divide(9, 3)
	f()
	fmt.Println("프로그램이 계속 실행됨")
	divide(9, 0)
}
