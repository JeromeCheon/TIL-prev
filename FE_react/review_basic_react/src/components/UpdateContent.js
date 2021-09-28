import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      subject: this.props.data.subject,
      desc: this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    
    return (
      <article>
        <h1>과목 수정하기</h1>
        <form action={"update_process"} method={'post'}
          onSubmit={function (e) {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.subject,
              this.state.desc
            )
        }.bind(this)}>
          <p><input type="text" name="subject" placeholder="과목을 입력하세요"
            value={this.state.subject} onChange={this.inputFormHandler}
          ></input></p>
          <p><textarea name="desc" placeholder="내용을 입력하세요"
            value={this.state.desc} onChange={this.inputFormHandler}
          ></textarea></p>
          <p><input type="submit" value="생성하기"></input></p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;