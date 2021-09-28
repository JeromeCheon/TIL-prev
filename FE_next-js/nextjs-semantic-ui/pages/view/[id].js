import Axios from 'axios'
import Head from 'next/dist/shared/lib/head'
import Item from '../../components/Item'
import { Loader } from 'semantic-ui-react'

const Post = ({item, name}) => {

  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}/>
          </Head>
          {name} 환경 입니다
          <Item item={item} />
        </>
      )}
    </>
  );
}

export default Post;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const apiUrl = `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name
    },
  };
}
