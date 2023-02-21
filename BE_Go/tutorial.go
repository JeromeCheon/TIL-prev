package main

import "fmt"

type Stringer interface {
	String() string
}

type Student struct {
	Name string
	Age  int
}

// func PrintVal(v interface{}) { //  빈 인터페이스를 인수로 받는 함수
// 	switch t := v.(type) {
// 	case int:
// 		fmt.Printf("v is int %v\n", int(t))
// 	case float64:
// 		fmt.Printf("v is float64 %v\n", float64(t))
// 	case string:
// 		fmt.Printf("v is float64 %v\n", string(t))
// 	default:
// 		fmt.Printf("Not Supported type: %T:%v\n", t, t)
// 	}

// }

// func (s Student) String() string {
// 	return fmt.Sprintf("안녕! 나는 %d살 %s라고 해", s.Age, s.Name)
// }

// func main() {
// 	student := Student{"철수", 12}
// 	PrintVal(10)
// 	PrintVal(3.14)
// 	PrintVal("Hello")
// 	PrintVal(Student{Age: 15})
// 	var stringer Stringer

// 	stringer = student
// 	fmt.Printf("%s\n", stringer.String())

// }

func (s *Student) String() string {
	return fmt.Sprintf("Student Age:%d", s.Age)
}

func PrintAge(stringer Stringer) {
	s := stringer.(*Student)
	fmt.Printf("Age: %d\n", s.Age)
}

func main() {
	s := &Student{Age: 15}
	PrintAge(s)
}
