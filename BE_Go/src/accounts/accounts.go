package accounts

import "errors"

// Account struct -> comment를 반드시 붙이게끔 lint가 강제해
type Account struct {
	owner string
	balance int
}

var errNoMoney = errors.New("can't withdraw")

// NewAccount creates Account
func NewAccount(owner string) *Account {
	account := Account{owner:owner, balance: 0}
	return &account
}

// 이렇게 함으로써 Account는 Deposit이라는 메서드를 갖는다
// 이게 go에서는 receiver. 근데 값을 변경하려면 포인터로 해야해!!
// Deposit x amount on your account
func (a *Account) Deposit(amount int) {
	a.balance += amount
}

// Balance of your Account
func (a Account) Balance() int {
	return a.balance
}

// Withdraw x amount from your account
func (a *Account) Withdraw(amount int) error {
	if a.balance < amount {
		// return errors.New("Can't withdraw you are poor")
		return errNoMoney
	}
	a.balance -= amount
	return nil
}