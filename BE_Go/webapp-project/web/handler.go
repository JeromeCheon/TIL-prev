package web

import (
	"fmt"
	"net/http"
	"strconv"
)

func HandleRequest(w http.ResponseWriter, r *http.Request) {
	values := r.URL.Query() // can access query string from URL
	name := values.Get("name")
	if name == "" {
		name = "World"
	}
	id, _ := strconv.Atoi(values.Get("id"))
	fmt.Fprintf(w, "Hello %s! id:%d", name, id)
}
