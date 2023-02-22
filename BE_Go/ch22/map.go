package main

import "fmt"

const M = 10

func hash(d int) int {
	return d % M
}

func main() {
	m := make(map[string]string) // make함수로 map을 만듦
	m["이화랑"] = "서울시 광진구"
	m["송하나"] = "서울시 강남구"
	m["백두산"] = "부산시 사하구"
	m["최번개"] = "전주시 덕진구"

	m["최번개"] = "청주시 상당구" // 값 변경

	fmt.Printf("송하나의 주소는 %s입니다. \n", m["송하나"])
	fmt.Printf("백두산의 주소는 %s입니다. \n", m["백두산"])

	ms := [M]int{}
	ms[hash(23)] = 10
	ms[hash(259)] = 50
	fmt.Printf("%d = %d\n", 23, ms[hash(23)])
	fmt.Printf("%d = %d\n", 23, ms[hash(259)])
}
