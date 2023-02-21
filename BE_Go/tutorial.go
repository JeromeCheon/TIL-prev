package main

import (
	"fmt"
	"os"
)

func sum(nums ...int) int {
	sum := 0

	fmt.Printf("nums 타입: %T\n", nums)
	for _, v := range nums {
		sum += v
	}
	return sum
}

func main() {
	fmt.Println(sum(1, 2, 3, 4, 5))
	fmt.Println(sum(10, 20))
	fmt.Println(sum())

	f, err := os.Create("test.txt")
	if err != nil {
		fmt.Println("Failed to create a file")
		return
	}

	defer fmt.Println("반드시 호출됨")
	defer f.Close()
	defer fmt.Println("파일을 닫았습니다.")

	fmt.Println("파일에 Hello world를 씁니다.")
	fmt.Fprintln(f, "Hello World")
}
