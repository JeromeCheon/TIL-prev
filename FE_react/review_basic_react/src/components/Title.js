import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
      <header>
        <a href='/'
          onClick={function (e) {
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}
        >

          <h1>{this.props.title}</h1>
        </a>
        <p>{this.props.sub}</p>
      </header>
    );
  }
}

export default Title;