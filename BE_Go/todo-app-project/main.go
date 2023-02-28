package main

import (
	"github.com/JeromeCheon/TIL/BE_Go/todo-app-project/handler"
	"github.com/unrolled/render"
	"log"
	"net/http"
)

func main() {
	handler.Rd = render.New()

	log.Println("Started App")
	err := http.ListenAndServe(":3000", handler.MakeRootHandler())
	if err != nil {
		panic(err)
	}
}
