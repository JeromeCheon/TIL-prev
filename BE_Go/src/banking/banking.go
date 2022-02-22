package banking

// Account struct -> comment를 반드시 붙이게끔 lint가 강제해
type Account struct {
	Owner string
	Balance int
}