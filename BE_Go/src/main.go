package main

import (
	"BE_Go/src/dict"
	"fmt"
)

// "BE_Go/src/accounts"
// "fmt"
func main()  {
	// account := accounts.NewAccount("jerome")
	// account.Deposit(10)
	// fmt.Println(account.Balance())
	// err := account.Withdraw(20)
	// if err != nil {
	// 	// log.Fatalln(err)
	// 	fmt.Println(err)
	// }
	// // fmt.Println(account.Balance(), account.Owner())  // 이렇게 해줄수도 있겠지만, 함수가 기본적으로 지원해주는 기본 메서드가 있어
	// fmt.Println(account)
	dictionary := dict.Dictionary{
		"first": "First word",
	}
	word := "hello"
	definition := "Greeting"
	err := dictionary.Add(word, definition)
	// definition, err :=dictionary.Search("second")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(definition)
}