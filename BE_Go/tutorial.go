package main

import (
	"container/list"
	"fmt"
)

func main() {
	v := list.New()
	e4 := v.PushBack(4)   // 리스트 뒤에 요소 추가
	e1 := v.PushFront(1)  // 리스트 앞에 요소 추가
	v.InsertBefore(3, e4) // e4 요소 앞에 요소 삽입
	v.InsertAfter(2, e1)  // e1	요소 뒤에 요소 삽입

	for e := v.Front(); e != nil; e = e.Next() {
		fmt.Print(e.Value, " ")
	}

	fmt.Println()
	for e := v.Back(); e != nil; e = e.Prev() {
		fmt.Print(e.Value, " ")
	}
}
