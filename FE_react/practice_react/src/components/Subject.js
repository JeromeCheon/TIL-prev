import React from 'react';

// Subject 라는 클래스를 외부에서 가져다쓸 수 있게 다음과 같이 적는다.
export default function Subject({ title, sub, onChangePage }) {

  const shiftSubject = (e) => {
    e.preventDefault();
    onChangePage();
  };

  return (
    <header>
      <h1><a href="/" onClick={shiftSubject}>{title}</a></h1>
      {sub}
    </header>
  );
}