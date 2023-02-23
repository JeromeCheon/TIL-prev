package main

import (
	"fmt"
	"time"
)

func PrintHangul() {
	hanguls := []rune{'가', '나','다','라','마','바','사'}
	for _, v := range hanguls {
		time.Sleep(300 * time.Millisecond)
		fmt.Printf("%c", v)
	}
}

func PrintNumbers() {
	for i := 1; i <= 5; i++ {
		time.Sleep(400 * time.Millisecond)
		fmt.Printf("%d ", i)
	}
}

func main() {
	go PrintHangul()
	go PrintNumbers()
	
	time.Sleep(3 * time.Second) // main 함수 3초간 대기. 이 코드가 없으면 main 루틴이 바로 종료가 돼서
	// 위 고루틴들은 즉시 종료가 됨
	// 근데 매번 함수 실행 시간을 알고 정의해줄 수는 없는데 고루틴이 종료될 때까지 어떻게 대기할 수 있을까?
	// sync 패키지의 WaitGroup 객체를 사용하면돼 ex24.2에서 다뤄보자
}