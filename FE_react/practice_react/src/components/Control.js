import React from 'react';

function Control({ onChangeMode }) {

  const indicateControl = (control, e) => {
    e.preventDefault();
    onChangeMode(control);
  };

  return (
    <ul>
      <li><a href="/create" onClick={indicateControl.bind(this, 'create')}>create</a></li>
      <li><a href="/update" onClick={indicateControl.bind(this, 'update')}>update</a></li>
      {/* delete는 좀 달라. link 같은 페이지 개념이 아니라 button 같은 operation으로 */}
      <li><input type="button" value="delete" onClick={indicateControl.bind(this, 'delete')}></input></li>
    </ul>
  );
}

export default Control;