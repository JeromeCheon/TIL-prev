import React, { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    if (newProps.data === this.props.data) {
      return false;
    }
    return true;
  }
  render() {
    const contents = [];
    for (let content of this.props.data) {
      contents.push(
        <li key={content.id}>
          <a href={"/contents/" + content.id}
            onClick={function (id, e) {
              e.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, content.id)}
          >
          {/* 여기서 이제 이벤트를 추가해줘야 겠지. */}
          {content.subject}
        </a>
      </li>
      )
    }
    return (
      <nav>
        <ul>
          {contents}
        </ul>
      </nav>
    );
  }
}

export default TOC;