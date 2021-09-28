
import React, { Component } from 'react';
import Title from './components/Title';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 2;
    this.state = {
      mode: 'welcome',
      selected_id: 0,
      header: { title: "Review react basic", sub: "written by Jerome" },
      welcome: { subject: "Basic React", desc: "welcome to this page programmed using React" },
      contents: [
        { id: 0, subject:"HTML", desc:"HTML is a basic markup language to learn about WEB" },
        { id: 1, subject:"CSS", desc:"CSS is Cascading Style Sheet language." },
        { id: 2, subject:"Javascript", desc:"Javascript is the basic language to deal with DOM in browser." }
      ]
    }
  }
  getReadContent() {
    for (let content of this.state.contents) {
      if (content.id === this.state.selected_id) {
        return content;
      }
    }
  }
  printContent() {
    let _subject, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      // welcome 일 때 동작 수행하게
      _subject = this.state.welcome.subject;
      _desc = this.state.welcome.desc;
      _article = <ReadContent subject={_subject} desc={_desc}></ReadContent>;
    }
    else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _subject = _content.subject;
      _desc = _content.desc;
      _article = <ReadContent subject={_subject} desc={_desc}></ReadContent>;
      
    }
    else if (this.state.mode === 'create') {
      // create 동작일 때 최대 id 값을 올려주고 _article은 createContent의 결과여야 
      // 그리고 mode와 content, selected_id를 업그레이드 해줘야
      this.max_content_id++;
      _article = <CreateContent
        onSubmit={function (_subject, _desc) {
          const newContent = this.state.contents.concat({ id: this.max_content_id, subject: _subject, desc: _desc });
          this.setState({
            mode: 'read',
            contents: newContent,
            selected_id: this.max_content_id
          });
        }.bind(this)}
      ></CreateContent>
    }
    else if (this.state.mode === 'update') {
      // update는 좀 복잡해. read 된 것의 내용을 create 양식에 그대로 가져오고
      // 이걸 수정한 다음 submit 하면 setState로 갱신이 되어야 해 
      _article = <UpdateContent 
        onSubmit={function (_id, _subject, _desc) {
          const renewContent = Array.from(this.state.contents);
          for (let i = 0; i < renewContent.length; i++) {
            if (_id === renewContent[i].id) { // 해당하는 id값을 찾으면 그 내용을 변경하는거야
              renewContent[i] = { id: _id, subject: _subject, desc: _desc };
              break;
            }
          }
          this.setState({
            mode: 'read',
            contents: renewContent
          });
        }.bind(this)}
        data={this.getReadContent()}
      ></UpdateContent>
    }
    
    return _article;
  }
  deleteContent() {
    // 해당하는 content를 불러서 pop을 한뒤 max id 바꿔.
    let _contents = Array.from(this.state.contents);
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      for (let i = 0; i < _contents.length; i++) {
        if (_contents[i].id === this.state.selected_id) {
          _contents.splice(i, 1);
          break;
        }
      }
      this.setState({
        mode: 'welcome',
        contents: _contents
      });
      alert("삭제되었습니다.");
    }
  }
  render() {
    return (
      <div className="App">
        {/* Here I will connect with some components to draw the basic website */}
        <Title
          title={this.state.header.title}
          sub={this.state.header.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Title>

        <TOC
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              selected_id: Number(id),
              mode: 'read'
            });
          }.bind(this)}
        ></TOC>
        <Control onChangeMode={function (_mode) {
          // delete일 때는 바로 실행하게 하자
          if (_mode === 'delete') {
            this.deleteContent();
          }
          else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.printContent()}
      </div>
    );
  }
}

export default App;
