'use strict';
// callback hell example
// 백앤드 없이 일단은 이렇게 정보를 받았다고 가정하고 해보자 
class UserStorage {
	loginUser(id, password, onSuccess, onError){
    setTimeout(() => {
      if (
        (id === 'jerome' && password === 'jeromy') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
	}
	getRoles(user, onSuccess, onError){
    setTimeout(() => {
      if (user === 'jerome') {
        onSuccess({ name: 'jerome', role: 'admin' });
      } else {
        onError(new Error('no access'));
      }
    }, 1000);
	}
}
// 첫번째로 서버에게서 아이디와 패스워드를 받을것이다. 

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(`your name: ${userWithRole.name}, and role: ${userWithRole.role}`)
      },
      error => {
        console.log(error);
      }
    );
}, (error) => {
  console.log(error);
});
