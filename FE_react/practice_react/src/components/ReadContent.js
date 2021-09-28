import React from 'react';

// Description 이라는 클래스를 외부에서 가져다쓸 수 있게 다음과 같이 적는다.
// 함수형은 다음과 같이 바꿀 수 있는데 props의 경우, 함수 인자로 바로 넣어주고 this.props 필요없어
export default function ReadContent({title, desc}){
  return (
    <article>
      <h2>{ title }</h2>
      { desc }
    </article>
  );
}