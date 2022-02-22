package main

import "fmt"

type person struct {
	name string
	age int
	favFood []string
}

func main()  {
	favFood := []string{"pizza", "fried chicken"}
	jerome := person{name: "jerome", age: 20, favFood: favFood}
	fmt.Println(jerome)
}