package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/JeromeCheon/TIL/BE_Go/webapp-project/web"
	"github.com/stretchr/testify/assert"
)

func TestIndexHandler(t *testing.T) {
	assert := assert.New(t)
	res := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/", nil) // 경로 테스트

	mux := http.NewServeMux()
	mux.HandleFunc("/", web.HandleRequest)
	mux.ServeHTTP(res, req)

	assert.Equal(http.StatusOK, res.Code) // Code 확인
	data, _ := io.ReadAll(res.Body)       // 데이터를 읽어서 확인
	assert.Equal("Hello World! id:0", string(data))

}

func TestBarHandler(t *testing.T) {
	assert := assert.New(t)

	res := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/bar", nil) // 경로 테스트

	mux := http.NewServeMux()
	mux.HandleFunc("/bar", web.HandleRequest)
	mux.ServeHTTP(res, req)

	assert.Equal(http.StatusOK, res.Code) // Code 확인
	data, _ := io.ReadAll(res.Body)       // 데이터를 읽어서 확인
	assert.Equal("Hello World! id:0", string(data))

}

func TestStudentHandler(t *testing.T) {
	assert := assert.New(t)

	res := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/student", nil) // "/student" path test

	mux := http.NewServeMux()
	mux.HandleFunc("/student", web.StudentHandler)
	mux.ServeHTTP(res, req)

	assert.Equal(http.StatusOK, res.Code)
	student := new(web.Student)
	err := json.NewDecoder(res.Body).Decode(student)
	assert.Nil(err)
	assert.Equal("aaa", student.Name)
	assert.Equal(16, student.Age)
	assert.Equal(87, student.Score)
}
