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

	// 표준출력: 특수문자 fmt Format 처리
	str := "Hello\tGo\t\tWorld\n\"Go\" is Awesome!\n"
	fmt.Print(str)
	fmt.Printf("%s", str)
	fmt.Printf("%q", str)

	/* 표준입력: 
	Scan() -> 표준 입력에서 값을 입력받음, 
	Scanf() -> 표준 입력에서 서식 형태로 값을 입력받음 
	Scanln() -> 표준 입력에서 한 줄 읽어서 값을 입력 받음 */
	var scanA int
	var scanB int

	n, err := fmt.Scan(&scanA, &scanB)
	if( err != nil) {
		fmt.Println(n, err)
	} else {
		fmt.Println(n, scanA, scanB)
	}
}