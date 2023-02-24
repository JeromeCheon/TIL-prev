package main

import (
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
