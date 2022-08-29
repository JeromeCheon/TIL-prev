package main

import "fmt"

const (
	apple = iota // 0
	grape
	Orange
)


func main () {
	fmt.Println(apple, grape, Orange)
}
/*
go 프로그래밍 언어는 다음과 같은 25개의 예약 키워드를 갖는다.
이들 Go 키워드들은 변수명, 상수명, 함수명 등의 identifier로 사용할 수 없음
break, default, func, interface, select, case, defer, go, map, struct, chan
else, goto, package, switch, const, fallthrough, if, range, type, continue, for
import, return, var
*/