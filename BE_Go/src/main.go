package main

import (
	"BE_Go/src/accounts"
	"fmt"
)
func main()  {
	account := accounts.NewAccount("jerome")
	account.Deposit(10)
	fmt.Println(account.Balance())
	account.Withdraw(20)
	fmt.Println(account.Balance())
}