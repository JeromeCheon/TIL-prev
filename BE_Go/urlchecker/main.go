package main

import (
	"errors"
	"fmt"
	"net/http"
	"time"
)

type requestResult struct {
	url string
	status string
}

var errRequestFailed = errors.New("Request failed")

func main()  {
	// var results = map[string]string{}  // 이렇게 {}를 붙여서 map에 대한 인스턴스를 만들거나
	results := make(map[string]string) // 이런식으로 empty map으로 초기화할 수 있어
	c := make(chan requestResult)
	urls := []string{
		"https://www.airbnb.com/",
		"https://www.google.com/",
		"https://www.amazon.com/",
		"https://www.reddit.com/",
		"https://soundcloud.com/",
		"https://www.facebook.com/",
		"https://www.instagram.com/",
		"https://academy.nomadcoders.co/",
	}
	for _, url := range urls {
		// result := "OK"
		// err := hitURL(url, c)
		go hitURL(url, c)
		// if err != nil {
		// 	result = "FAILED"
		// }
		// results[url] = result
	}
	for i := 0; i < len(urls); i++ {
		result := <-c
		results[result.url] = result.status
	}
	for url, status := range results {
		fmt.Println(url, status)
	}
	// for url, result := range results {
	// 	fmt.Println(url, result)
	// }
	
	// go routine과 channel 학습
	// c := make(chan bool)
	// people := [2]string{"jerome", "simo"}
	// for _, person := range people {
	// 	go isSexy(person, c)
	// }
	// fmt.Println(<-c)
	// fmt.Println(<-c)
}

func hitURL(url string, c chan<- requestResult) { // 이 채널은 데이터를 받을 순 없고 보낼수만 있다! 하면 'chan<-'
	fmt.Println("Checking:", url)
	resp, err := http.Get(url)
	status := "OK"
	if err != nil || resp.StatusCode >= 400 {
		status = "FAILED"
		// return errRequestFailed
	}
	c <- requestResult{url: url, status: status}
	// return nil
}

func isSexy(person string, c chan bool) {
	time.Sleep(time.Second * 5)
	fmt.Println(person)
	c <- true
}