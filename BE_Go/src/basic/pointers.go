package main

import "fmt"


func main()  {
	a := 2
	b := a
	// 어떤 값이 저장된 메모리의 주소를 보기 위해서는 &를 붙인다
	// 그리고 그 주소에 담긴 값을 보려면 *를 붙인다
	fmt.Println(&a, &b)

	a2 := 2
	b2 := &a2
	*b2 = 202020
	fmt.Println(a2)
}