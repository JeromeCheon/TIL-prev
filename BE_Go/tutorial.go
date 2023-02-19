package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	/*
		for 문. Go에서는 반복문으로 for 하나만 지원하지만 여러형태가 있음을 알아야해
		기본 형태는
		for 초기문; 조건문; 후처리 {
			code block	-> 조건문이 true인 경우 수행
		}
		1.1 초기문 생략. 생략해도 ;붙여서 조건문 자리를 표시해줘야 함
		1.2 후처리 생략. 생략해도 조건문 뒤에 ;붙여줘야 함
		1.3 조건문만 있을 때
		for ; 조건문 ; {
			code block
		} or 
		for 조건문 {
			code block
		} 이 때 조건문이 true이면 무한 루프가 된다. 
		한편, 중첩 for문을 구성할 때 break 범위를 지정하고 싶다면 flag 변수를 사용하거나 레이블을 지정하면 된다
	*/
	stdin := bufio.NewReader(os.Stdin)

	for {
		fmt.Println("입력하세요.")
		var number int
		_, err := fmt.Scanln(&number)
		if err != nil {
			fmt.Println("숫자를 입력하세요.")

			// 키보드 버퍼를 비웁니다.
			stdin.ReadString('\n')
			continue
		}
		fmt.Printf("입력하신 숫자는 %d입니다.\n", number)
		if number%2 == 0 {
			break
		}
	}
	fmt.Println("for 문이 종료되었습니다.")
}