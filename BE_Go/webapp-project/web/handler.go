package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Student struct {
	Name  string
	Age   int
	Score int
}

func HandleRequest(w http.ResponseWriter, r *http.Request) {
	values := r.URL.Query() // can access query string from URL
	name := values.Get("name")
	if name == "" {
		name = "World"
	}
	id, _ := strconv.Atoi(values.Get("id"))
	fmt.Fprintf(w, "Hello %s! id:%d", name, id)
}

func StudentHandler(w http.ResponseWriter, r *http.Request) {
	var student = Student{"aaa", 16, 87}
	data, _ := json.Marshal(student)                   // Student 객체를 []byte 로 변환
	w.Header().Add("content-type", "application/json") // JSON 포맷임을 표시
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, string(data)) // 결과 전송
}
