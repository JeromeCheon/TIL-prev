package handler

import (
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
	"net/http"
	"sort"
)

var Rd *render.Render

type Todo struct { // Todo 정보를 담는 구조체
	ID        int    `json:"id,omitempty"` // JSON 포맷으로 변환 옵션
	Name      string `json:"name"`
	Completed bool   `json:"completed,omitempty"`
}

var todoMap map[int]Todo
var lastID int = 0

type Todos []Todo

func (t Todos) Len() int {
	return len(t)
}

func (t Todos) Swap(i, j int) {
	t[i], t[j] = t[j], t[i]
}

func (t Todos) Less(i, j int) bool {
	return t[i].ID > t[j].ID
}
func GetTodoListHandler(w http.ResponseWriter, r *http.Request) {
	list := make(Todos, 0)
	for _, todo := range todoMap {
		list = append(list, todo)
	}
	sort.Sort(list)
	Rd.JSON(w, http.StatusOK, list) // ID로 정렬해서 전체 목록 반환
}

func PostTodoHandler(w http.ResponseWriter, r *http.Request)   {}
func UpdateTodoHandler(w http.ResponseWriter, r *http.Request) {}
func DeleteTodoHandler(w http.ResponseWriter, r *http.Request) {}

func MakeRootHandler() http.Handler {
	todoMap = make(map[int]Todo)
	mux := mux.NewRouter()
	mux.Handle("/", http.FileServer(http.Dir("public")))
	mux.HandleFunc("/todos", GetTodoListHandler).Methods("GET")
	mux.HandleFunc("/todos", PostTodoHandler).Methods("POST")
	mux.HandleFunc("/todos/{id:[0-9]+}", DeleteTodoHandler).Methods("DELETE")
	mux.HandleFunc("/todo/{id:[0-9]+}", UpdateTodoHandler).Methods("PUT")
	n := negroni.Classic()
	n.UseHandler(mux)
	return n
}
