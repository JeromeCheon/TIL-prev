package main

import (
	"BE_Go/src/accounts"
	"fmt"
)
func main()  {
	account := accounts.NewAccount("jerome")
	account.Deposit(10)
	fmt.Println(account.Balance())
	err := account.Withdraw(20)
	if err != nil {
		// log.Fatalln(err)
		fmt.Println(err)
	}
	fmt.Println(account.Balance())
}