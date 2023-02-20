package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

/*
문자열의 길이, 즉 음절 개수를 알고 싶으면 rune을 사용하면 된다.
string 타입은 연속된 바이트 메모리라고 하면 []rune 타입은 글자들의 배열로 이뤄져
Go는 둘의 상호 타입 변환을 지원하고 있음
또 string타입과 []byte 타입은 상호 타입 변환이 가능함

문자열 순회는 1. 인덱스 순회 2. []rune 사용 3. range 사용한 순회
*/
func main() {
	str := "Hello 월드"
	runes := []rune(str)

	for i := 0; i < len([]rune(str)); i++ {
		fmt.Printf(" 타입:%T 값:%d 문자값:%c\n", runes[i], runes[i], runes[i])
	}
	for _, v := range str {
		fmt.Printf(" 타입:%T 값:%d 문자값:%c\n", v, v, v)
	}
	fmt.Printf("len(str) = %d\n", len(str))
	fmt.Printf("len(runes) = %d\n", len(runes))

	str1 := "Hello World!"
	str2 := str1
	stringHeader1 := (*reflect.StringHeader)(unsafe.Pointer(&str1))
	stringHeader2 := (*reflect.StringHeader)(unsafe.Pointer(&str2))

	fmt.Println(stringHeader1)
	fmt.Println(stringHeader2)

}
