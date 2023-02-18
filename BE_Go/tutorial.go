package main

import "fmt"

func main() {
	var a int8 = 3
	var b float32 = 16.223
	var c = 4
	d := 5 // 이 형태를 선언 대입문이라고 한다. 숫자는 int64로, 실수는 float64로 읽는다

	fmt.Println(a, b, c, d)

	// 타입변환
	var e int = int(b)
	f := float64(c * d)
	fmt.Println(e, f)
}