package main

import "fmt"


func main()  {
	jerome := map[string]string{"name":"jerome", "age": "20"}
	for key, value := range jerome {
		fmt.Println(key, value)
	}
}