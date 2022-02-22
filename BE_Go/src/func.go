package main

import (
	"fmt"
	"strings"
)

func multiply(a, b int) int { // 이렇게 명시적으로 타입을 넣어줘야 한다
	return a * b
}
// Go 만의 특징으로, 함수 반환 값이 여러개일 수 있다
// func lenAndUpper(name string) (int, string) {
func lenAndUpper(name string) (length int, uppercase string) {
	defer fmt.Println("I'm done")// defer: 함수가 실행되고 난 후에 코드가 실행돼
	// return len(name), strings.ToUpper(name) // 이렇게 명시적으로 return 값을 적어줘도 되고,
	length = len(name)
	uppercase = strings.ToUpper(name)
	return
}

func repeatMe(words ...string) {
	fmt.Println(words)
}

func main()  {
	fmt.Println(multiply(2, 3))
	totalLength, upperName := lenAndUpper("jerome")
	fmt.Println(totalLength, upperName)
	// totalLength, _ := lenAndUpper("jerome") 이렇게 반환값을 underscore로 ignore 시켜줄 수도 있다
	// fmt.Println(totalLength)
	repeatMe("jerome", "simo", "dab", "day")
}