package main

import (
	"fmt"
	"github.com/JeromeCheon/TIL/BE_Go/todo-app-project/handler"
	"net/http"
)

func main() {
	fmt.Println("test")
	http.ListenAndServe(":3000", handler.MakeRootHandler())
}
