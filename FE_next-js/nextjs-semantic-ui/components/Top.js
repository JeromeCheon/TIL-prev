import React from 'react'
import { Header } from 'semantic-ui-react'
import Gnb from './Gnb'
import styled from 'styled-components';

const Top = () => {
  return (
    <div>
      <TopStyle>
        <LogoStyle><LogoImage src="/images/cf_logo.png" alt="logo"/></LogoStyle>
        <Header as="h1">제로미</Header>
      </TopStyle>
      <Gnb/>
    </div>
  )
}

export default Top

const TopStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20;
`;

const LogoStyle = styled.div`
  flex: 100px 0 0;
`;

const LogoImage = styled.img`
  display: block;
  width: 80px;
`;