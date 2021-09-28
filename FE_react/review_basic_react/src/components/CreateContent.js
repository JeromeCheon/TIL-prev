import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    return (
      <article>
        <h1>과목 생성하기</h1>
        <form action={"create_process"} onSubmit={function (e) {
          e.preventDefault();
          this.props.onSubmit(
            e.target.subject.value,
            e.target.description.value
          )
        }.bind(this)}>
          <p><input type="text" name="subject" placeholder="과목을 입력하세요"></input></p>
          <p><textarea name="description" placeholder="내용을 입력하세요"></textarea></p>
          <p><input type="submit" value="생성하기"></input></p>
        </form>
      </article>
    );
  }
}

export default CreateContent;