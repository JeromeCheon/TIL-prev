package main

func main () {
	var name string
	var category = 1

	// Expression 사용했을 때
	switch x := category << 2; x-1 {
	case 1:
		name = "Paper Book"
	case 2:
		name = "eBook"
	case 3:
		name = "Blog"
	default:
		name = "Other"
	}
	/** Go 만의 switch 문 특별한 용법
	1. switch 뒤에 expression이 없을 수 있음 : 이 때는 switch expression을 true로 생각하고 첫번째 case문으로 이동, 검사
	2. case문에 expression을 쓸 수 있음: 일반적으로 리터럴 값만 갖지만 Go에선 복잡한 expression도 case에 있을 수 있음
	3. No default fall through: 다른 switch는 break 써야 case 건너뛰지만 Go는 break 없어도 다음 case에 가지 않음
	4. Type switch : 변수의 값을 기준으로 분기 하는 것이 아닌, 그 변수의 type에 따라 case로 분기할 수 있음
	*/

	println(name)
}