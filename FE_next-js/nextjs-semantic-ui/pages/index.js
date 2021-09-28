import Axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { ItemList } from '../components/ItemList';
import { Loader } from 'semantic-ui-react';

export default function Home({ list }) {

  return (
    <div>
      <Head>
        <title>Test APP</title>
      </Head>
      <>
        <Header as="h3" style={{ paddingTop: 40 }}>베스트 상품</Header>
        <Divider/>
        <ItemList list={list.slice(0, 9)} />
        <Header as="h3" style={{ paddingTop: 40 }}>신상품</Header>
        <Divider/>
        <ItemList list={list.slice(9)} />
      </>
    </div>     
  )
}

export const getStaticProps = async () => {
  // 클라이언트 환경이 아니면 NEXT_PUBLIC을 붙일 필요가 없다. 
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = process.env.apiUrl;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      list: data,
      name: process.env.name
    }
  }
}