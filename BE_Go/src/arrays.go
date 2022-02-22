package main

import "fmt"


func main()  {
	names := []string{"jerome", "simo", "lucy"}
	// names := [3]string{"jerome", "simo", "lucy"}
	names = append(names, "ho")
	fmt.Println(names)
}