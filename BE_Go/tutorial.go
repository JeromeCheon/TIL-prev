package main

import "fmt"

/*
포인터는 왜, 언제 쓰나?
변수 대입이나 함수 인수 전달은 항상 값을 복사하기 때문에 많은 메모리 공간을 사용하는 문제와 큰 메모리 공간을 복사할 때 발생하는 성능 문제를 안고 있음
또 다른 공간으로 복사되기 때문에 변경 사항이 적용되지도 않음.
*/

type User struct {
	Name string
	Age  int8
}

func NewUser(a string, b int8) *User {
	var u = User{a, b}
	return &u
}

func main() {
	var a int = 500
	var p *int
	p = &a

	fmt.Printf("p의 값: %p\n", p)
	fmt.Printf("p가 가리키는 메모리의 값: %d\n", *p)
	*p = 100
	fmt.Printf("a의 값: %d\n", a)

	userPointer := NewUser("AAA", 23)

	fmt.Print(userPointer)
}
