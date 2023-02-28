package main

import (
	"net/http"

	"github.com/JeromeCheon/TIL/BE_Go/restful-api-server/handler"
)

func main() {
	http.ListenAndServe(":3000", handler.MakeWebHandler())

}
