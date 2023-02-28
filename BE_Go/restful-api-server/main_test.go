package main

import (
	"encoding/json"
	"github.com/JeromeCheon/TIL/BE_Go/restful-api-server/handler"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestJsonHandler(t *testing.T) {
	assert := assert.New(t)

	res := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/students", nil)

	mux := handler.MakeWebHandler()
	mux.ServeHTTP(res, req)

	assert.Equal(http.StatusOK, res.Code)
	var list []handler.Student
	err := json.NewDecoder(res.Body).Decode(&list)
	assert.Nil(err)
	assert.Equal(2, len(list))
	assert.Equal("aaa", list[0].Name)
	assert.Equal("bbb", list[1].Name)

}

func TestJsonHandler2(t *testing.T) {
	assert := assert.New(t)

	var student handler.Student
	mux := handler.MakeWebHandler()
	res := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/students/1", nil)

	mux.ServeHTTP(res, req)
	assert.Equal(http.StatusOK, res.Code)
	err := json.NewDecoder(res.Body).Decode(&student)
	assert.Nil(err)
}

func TestJsonHandler3(t *testing.T) {
	assert := assert.New(t)

	var student handler.Student
	mux := handler.MakeWebHandler()
	res := httptest.NewRecorder()
	req := httptest.NewRequest("POST", "/students",
		strings.NewReader(`{"Id": 0, "Name": "ccc", "Age": 15, "Score": 78}`))

	mux.ServeHTTP(res, req)
	assert.Equal(http.StatusCreated, res.Code)

	res = httptest.NewRecorder()
	req = httptest.NewRequest("GET", "/students/3", nil)
	// 추가된 학생 데이터
	mux.ServeHTTP(res, req)

	assert.Equal(http.StatusOK, res.Code)
	err := json.NewDecoder(res.Body).Decode(&student)
	assert.Nil(err)
	assert.Equal("ccc", student.Name)
}
