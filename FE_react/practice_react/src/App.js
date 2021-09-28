import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    // 우리가 하려고 하는 것은 state 값을 초기화 하려고 해. 
    // render 함수보다 더 일찍 실행되면서.이게 constructor 
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
      selected_content_id: 2,
      subject: { title: 'Web', sub: 'world wide web~~!' },
      welcome:{title:'Welcome', desc: 'Hello, React!'},
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'Javascript', desc: 'Javascript is for interactive' }
      ]
    }
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        // break;
      }
      i += 1;
    }
  }

  getContent() {
    // 위 state의 mode에 따라 랜더링 되는게 달라지게 조건문을 걸어보겠다.
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={ _title } desc={_desc}></ReadContent>
    }
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={ _content.title } desc={_content.desc}></ReadContent>
    }
    else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content to this.state.contents
        this.max_content_id += 1;
        // this.state.contents.push({ id: this.max_content_id, title: _title, desc: _desc });
        // this.setState({
          //   contents: this.state.contents
          // });
        // 근데 위와 같이 하면 원본을 변경하는 거라 안좋다. 와를 방지하기 위해 concat을 쓴다.
        var _contents = this.state.contents.concat({ id: this.max_content_id, title: _title, desc: _desc });
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
        // 정 push 를 쓰고 싶다면 
        // var newContents = Array.from(this.state.contents);
        // newContents.push({
        //   id: this.max_content_id,
        //   title: _title, desc: _desc
        // });
        // this.setState({
        //   contents: newContents
        // })
        console.log(_title, _desc)
      }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent
        data={_content}
        onSubmit={function (_id, _title, _desc) {
          // add content to this.state.contents
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) { // 교체하려는 것과 같다면 
              _contents[i] = { id: _id, title: _title, desc: _desc };
              break;
            }
            i++;
          }
          this.setState({
            contents: _contents,
            mode: 'read'
          });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  // 자 여기서 react state의 특징. state가 바뀌면, render함수가 다시 호출이 된다. 
  // 그리고 render 함수 하위에 있는 컴포넌트 들의 render도 다시 됨에 따라 화면이 다시 그려진다. 
  render() {
    return(
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'read' });
          }.bind(this)}
        > 
        </Subject>
        {/* <header>
          <h1><a href="/" onClick={function (e) {
            e.preventDefault();
            // this.state.mode = 'welcome'; // 이걸 그대로 쓰면 에러 나는데, 이 에러는 this bind 문제 때문. 
            // 근데 이렇게 해도 react의 state는 바뀌지 않는데, react에서 state를 바꾸는게 따로 있기 때문. 바로
            this.setState({
              mode: 'welcome'
            });
          }.bind(this)}>{this.state.subject.title}</a></h1>
        {this.state.subject.sub}
        </header> */}
        <TOC onChangePage={function (id) {
          // 여기 이 onChangePage 라는 props를 TOC에서도 받아야지. 
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });
          
        }.bind(this)} data={this.state.contents}></TOC>
        <Control onChangeMode={function (_mode) {
          // 여기서 delete 감지해서 실행해줘야지
          if (_mode === 'delete') {
            if (window.confirm('really??')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < this.state.contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                contents: _contents
              })
              alert("deleted!");
            }
          }
          else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this) }></Control>
        { this.getContent() }
      </div>
    );
  }
}

export default App;
