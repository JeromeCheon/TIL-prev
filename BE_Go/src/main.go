package main

import (
	"fmt"

	"BE_Go/src/banking"
)
func main()  {
	account := banking.Account{Owner:"jerome", Balance: 1000}
	fmt.Println(account)
}