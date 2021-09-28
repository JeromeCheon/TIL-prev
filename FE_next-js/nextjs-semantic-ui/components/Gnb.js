import React from 'react'
import { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Router, useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { GnbState } from '../recoil/GnbState';

const Gnb = () => {
  const [activeItem, setActiveItem] = useRecoilState(GnbState);

  const router = useRouter();

  const handleItemClick = (e, { name }) => {
    if (name === 'home') {
      // 보내주기 위해선 location.href 써도 되는데, next의 router를 이용하자 
      router.push('/');
    }
    else if (name === 'about') {
      router.push('/about')
    }
    // 한편, 이렇게 state로 GNB를 관리해도 되고, useRouter의 prop 중 pathname으로 
    // 가정법을 써서 해도 됨 (코딩 앙마 방법)
    setActiveItem(name)
  }

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='about'
          active={activeItem === 'about'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='contact Us'
          active={activeItem === 'contact'}
          onClick={() => router.push('/contact')}
        />
        <Menu.Item
          name='Admin'
          active={activeItem === 'admin'}
          onClick={() => router.push('/admin')}
        />
      </Menu>
    </Segment>
  )
}

export default Gnb
