package main

import (
	"BE_Go/src/accounts"
	"fmt"
)
func main()  {
	account := accounts.NewAccount("jerome")
	fmt.Println(account)
}