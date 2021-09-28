import Layout from '../components/Layout'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <h1>Welcome to My blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
// 이렇게 하는 방식도 있고, getStaticProps 방식도 있어
// export const getServerSideProps = async () => {
//   const res = await fetch(`http://localhost:8080/api/posts`);
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }

// dev MODE 에서는 별 차이를 못 느끼는 데 차이를 알기 위해 node 서버를 만들어서 실험 해보자
// 자 이걸 만약 설정해 놓고, build 이후 start(production 모드)하면 빠르게 보여져
// 근데 api 서버의 내용을 변경하고 node를 다시 켜서 보면 반영이 안돼 있어. 왜? 
// .next> server > pages >index.html 에 이미 만들어서 저장이 되어 있기 때문
// 만약 서버의 변경 내용을 반영하고 싶다 하면 revalidate 옵션을 줘야해. 시간을 value로 
// 이 시간이 지난 시점부터 언제든 접속이 일어나면 regeneration 시킬 수 있도록
export const getStaticProps = async () => {
  // const res = await fetch(`http://localhost:8080/api/posts`);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`);
  const posts = await res.json();

  return {
    props: {
      posts
    },
    // revalidate: 20,
  }
}
