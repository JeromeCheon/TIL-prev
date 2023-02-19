package main

import "fmt"


func getMyAge() int {
	return 22
}

func main() {
	day := "thursday"
	
	switch day {
	case "monday", "tuesday":
		fmt.Println("월, 화요일은 수업 가는 날입니다.")
	case "wednesday", "thursday", "friday":
		fmt.Println("수, 목, 금요일은 실습 가는 날입니다.")
	}
// switch 초기문
// if 문과 마찬가지로 switch문에서도 초기문을 넣을 수 있음
	switch age := getMyAge(); age {
	case 10:
		fmt.Println("Teen")
	case 33:
		fmt.Println("Pair 3")
	default:
		fmt.Println("My age is", age)
	}
	// 한편, Go 언어에서는 break를 사용하지 않아도 case 하나를 실행 후 자동으로 switch문을 빠져나가게 돼
	// 하나의 case문 실행 후 다음 case까지 같이 실행하고 싶다면? fallthrough 키워드 사용!
	// 그러나 코드를 보는 사람에게는 혼동을 일으킬 수 있으므로 사용하지 않는 것을 권장함
}