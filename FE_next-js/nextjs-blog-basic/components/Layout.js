import React from 'react';
import Nav from './Nav';
import HeadInfos from './HeadInfos';

const Layout = ({children}) => {
  return (
    <>
      <HeadInfos />
      <Nav />
      <div>
        {children}
      </div>
    </>
  )
}

export default Layout
