package main

import (
	"net/http"

	"github.com/JeromeCheon/TIL/BE_Go/webapp-project/web"
)

func main() {
	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) { // 두번째 인자로 함수 리터럴 바로 줄때
	// 	fmt.Fprint(w, "Hello world")
	// })
	mux := http.NewServeMux() // serveMux 인스턴스 생성
	mux.HandleFunc("/", web.HandleRequest)
	mux.HandleFunc("/bar", web.HandleRequest)
	http.ListenAndServe(":3000", mux) // 두번째 인자가 nil이면 DefaultServeMux를 사용한다는 것
}
