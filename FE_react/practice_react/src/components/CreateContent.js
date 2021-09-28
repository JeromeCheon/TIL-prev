import React from 'react';

export default function CreateContent({ onSubmit }) {
  const submitContent = e => {
    e.preventDefault();
    // 어떻게 이걸 가져올 수 있을까?
    // debugger로 멈춘다음, e.target에 들어가있는 값을 확인해봐
    // debugger;
    // this.props.onSubmit();
    onSubmit(
      e.target.title.value,
      e.target.desc.value
    );
  }

  return (
    <article>
      <h2>Create</h2>
      <form action="/create_process" method="post"
        onSubmit={submitContent}
      >
        <p><input type="text" name="title" placeholder="title"></input></p>
        <p>
          <textarea name="desc" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit"></input>
        </p>
      </form>
    </article>
  );
}