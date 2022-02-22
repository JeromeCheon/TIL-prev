package main

import "fmt"

func main()  {
	// function을 import할 때, name이 대문자이면 public, 소문자이면 private한 성격을 갖는다
	// 따라서 어떤 경로의 package를 import 할 때 나타나는 옵션은 대문자로 정의된 함수밖에 안 나타난다
	fmt.Println("Hello world with formatting package")
}