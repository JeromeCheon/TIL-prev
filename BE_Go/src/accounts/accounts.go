package accounts

// Account struct -> comment를 반드시 붙이게끔 lint가 강제해
type Account struct {
	owner string
	balance int
}

// NewAccount creates Account
func NewAccount(owner string) *Account {
	account := Account{owner:owner, balance: 0}
	return &account
}