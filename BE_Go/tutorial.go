package main

import (
	"fmt"
	"unsafe"
)

type User struct {
	Name string
	ID   string
	Age  int
}

type VIPUser struct {
	User
	VIPLevel int32
	Price    float64
}

/*
한편, 구조체 변수가 선언되면 컴퓨터는 구조체 필드를 모두 담을 수 있는 메모리 공간을 할당함
그리고 구조체 변숫값을 다른 구조체에 대입하면 모든 필드값이 복사됨
*/
func main() {
	user := User{"천재홍", "jerome", 29}
	vip := VIPUser{
		User{"재홍", "jaehong", 28},
		3,
		250,
	}

	fmt.Printf("유저: %s ID: %s age: %d\n", user.Name, user.ID, user.Age)
	fmt.Printf("VIP 유저: %s ID: %s 나이: %d VIP 레벨: %d VIP 가격: %f만원\n",
		vip.Name,
		vip.ID,
		vip.Age,
		vip.VIPLevel,
		vip.Price, // 여러 줄로 초기화 할 때는 제일 마지막 값 뒤에 꼭 쉼표를 달아주자
	)
	fmt.Println(unsafe.Sizeof(vip))
}
