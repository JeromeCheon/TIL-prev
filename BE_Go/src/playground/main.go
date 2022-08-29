package main

func main () {
	var name string
	var category = 1

	// Expression 사용했을 때
	switch x := category << 2; x-1 {
	case 1:
		name = "Paper Book"
	case 2:
		name = "eBook"
	case 3:
		name = "Blog"
	default:
		name = "Other"
	}
	println(name)
}