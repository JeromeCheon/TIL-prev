package main

import "fmt"

func canIDrink(age int) bool {
	// if-else 때 처럼 variable expression도 여기에서 사용할 수 있어
	switch {
	case age < 10:
		return false
	case age >= 18:
		return true
	}
	return false
}

func main()  {
	fmt.Println(canIDrink(18))
}