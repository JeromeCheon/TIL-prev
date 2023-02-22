package main

import (
	"container/list"
	"fmt"
)

type Queue struct {
	v *list.List
}

func (q *Queue) Push(elem interface{}) {
	q.v.PushBack(elem)
}

func (q *Queue) Pop() interface{} {
	front := q.v.Front()
	if front != nil {
		return q.v.Remove(front)
	}
	return nil
}

func NewQueue() *Queue {
	return &Queue{list.New()}
}

func main() {
	q := NewQueue()

	for i := 1; i < 5; i++ {
		q.Push(i)
	}

	v := q.Pop()
	for v != nil {
		fmt.Printf("%v -> ", v)
		v = q.Pop()
	}
}
