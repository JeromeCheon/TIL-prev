import React, { useState } from 'react';

export default function UpdateContent({ data, onSubmit }) {

  const [datas, setDatas] = useState(data);

  const inputFormHandler = e => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value
    });
  }
  console.log(`data: `, datas);
  return (
    <article>
      <h2>Update</h2>
      <form action="/create_process" method="post"
        onSubmit={function (e) {
          e.preventDefault();
          onSubmit(
            datas.id,
            datas.title,
            datas.desc
          );
        }}
      >
        {/* 한편, update는 보통 어떤걸 바꾸는지에 대한 식별자도 있어야 함. 사용자에게는 안보이게 해서 */}
        <input type="hidden" name="id" value={datas.id}></input>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            // value={this.props.data.title} // 이렇게만 하면 read only 라 수정이 안돼. state화 시켜줘야 겠지.
            value={datas.title} // 그래도 수정이 안되는데 어떻게? onChange 넣어줘 
            onChange={inputFormHandler.bind(this)}
          > 
          </input>
        </p>
        <p>
          <textarea 
            name="desc"
            placeholder="description"
            value={datas.desc}
            onChange={inputFormHandler.bind(this)} 
          >
          </textarea>
        </p>
        <p>
          <input type="submit"></input>
        </p>
      </form>
    </article>
  );
}
