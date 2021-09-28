import React from 'react';

export default function TOC({ data, onChangePage }){
  const lists = [];
  let i = 0;
  const showTableOfContent = (id, e) => {
    e.preventDefault();
    onChangePage(id);
  }
  while (i < data.length) {
    // lists.push(<li><a href={"/content/" + data[i].id}>{data[i].title}</a></li>);
    lists.push(<li key={data[i].id}>
      <a href={"/contents/" + data[i].id}
        // data-id={data[i].id}
        // onClick={function (e) {
        //   e.preventDefault();
        //   // data-로 시작하는 접두 속성을 했을 때 e.target의 dataset에서 그 속성을 찾을 수 있다.
        //   this.props.onChangePage(e.target.dataset.id);
        // }.bind(this)}

        // 이렇게도 할 수 있는데, bind 안에 두번째 인자부터는 function에서 첫번째로 이동하고 뒤에 하나씩 밀려.
        // 그러면 속성옵션은 빼줘야 함 (data-id={} 이거.)
        onClick={showTableOfContent.bind(this, data[i].id)}
      >
        {data[i].title}</a>
    </li>);
    i = i + 1;
  }
  return (
    <nav>
      <ul>
        {/* 이렇게 리스트를 자동으로 만들어준걸 바로 부르게 할 수 있다.
          그러나 이렇게 하면 key를 생성하라는 에러가 나는데 이는 위의 주석 아래 처럼 해결하면 된다.
        */}
        {lists}
        {/* <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">Javascript</a></li> */}
      </ul>
    </nav>
  );
}
