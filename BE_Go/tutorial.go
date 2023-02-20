package main

import (
	"fmt"
	"sort"
)

/*
일반적인 배열은 처음 배열을 만들 때 정한 길이에서 더이상 늘어나지 않는 문제도 있었음
슬라이스는 배열과 비슷하지만 [] 안에 배열의 개수를 적지 않고 선언함
append를 사용해서 요소를 추가할 수 있고, 여러값을 추가할 수도 있다.
그러나 append를 사용할 때 예기치 못한 문제를 마주할 수 있다.
*/

func main() {
	slice1 := []int{1, 2, 3, 4, 5}

	slice2 := append(slice1, 4, 5)
	// cap() 함수를 이용해서 슬라이스 capacity 값을 알 수 있음
	fmt.Println("slice1:", slice1, len(slice1), cap(slice1))
	fmt.Println("slice2:", slice2, len(slice2), cap(slice2))

	slice1[1] = 100 // slice2 까지 바뀜

	fmt.Println("After change second element")
	fmt.Println("slice1:", slice1, len(slice1), cap(slice1))
	fmt.Println("slice2:", slice2, len(slice2), cap(slice2))

	slice1 = append(slice1, 500)

	fmt.Println("After append 500")
	fmt.Println("slice1:", slice1, len(slice1), cap(slice1))
	fmt.Println("slice2:", slice2, len(slice2), cap(slice2))

	// range를 사용하면 slice를 복사할 수 있다.
	slice3 := make([]int, len(slice1))
	for i, v := range slice1 {
		slice3[i] = v
	}
	// 그러나 이걸 append를 사용하면 단순하게 할 수 있다.
	slice4 := append([]int{}, slice1...)
	slice1[1] = 600
	fmt.Println(slice1)
	fmt.Println(slice3)
	fmt.Println(slice4)
	// 내장함수 copy() 함수를 이용해서 복제할 수도 있다.
	cnt1 := copy(slice3, slice1)
	fmt.Println(cnt1, slice3)

	// 요소 중간에 추가하기
	slice5 := []int{1, 2, 3, 4, 5, 6}

	slice5 = append(slice5, 0)

	idx := 2

	for i := len(slice5) - 2; i >= idx; i-- {
		slice5[i+1] = slice5[i]
	}

	slice5[idx] = 100
	fmt.Println(slice5)

	// append 함수로 코드 개선하기
	slice5 = append(slice5[:idx], append([]int{100}, slice5[idx:]...)...)

	// 슬라이스 정렬. Go언어에서 기본 제공하는 sort 패키지를 사용해서 슬라이스를 정렬하는 방법 알아보자
	s := []int{5, 2, 6, 3, 1, 4}
	sort.Ints(s) // float 값을 정렬하고 싶다면 Float64s() 함수 사용하면 돼
	fmt.Println(s)
}
