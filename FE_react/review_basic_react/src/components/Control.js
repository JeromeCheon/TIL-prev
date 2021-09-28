import React, { Component } from 'react';

class Control extends Component {
  render() {
    const opStyles = {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row"
    }
    return (
      <div style={opStyles}>
        <a href={"/create"}
          onClick={function (e) {
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}
        >과목생성</a>
        <a href={"/update"}
          onClick={function (e) {
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}
        >과목수정</a>
        <input type="button" value="과목삭제"
          onClick={function (e) {
              e.preventDefault();
              this.props.onChangeMode('delete');
            }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default Control;