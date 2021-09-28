import Link from 'next/link'
import Date from '../components/date'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const introMessage = "재로미의 첫 번째 Next.js App. Basic tutorial과 TODO list 만들기";
  const subMessage = "제 블로그 주소도 함께 남길게요. 링크를 클릭하시면 이동합니다. ";
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{introMessage}</p>
        <p>
          ({subMessage}
          <a href="https://velog.io/@JeromeCheon" target="_blank">내 블로그</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* 여기에 TODO section을 넣자  */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} >
        <h2 className={utilStyles.heading}>TODO</h2>
        <ul className={utilStyles.list}>
          {/* 여기서부터는 TODO로 생성해서 받아올 수 있게 해야 함.  */}
        </ul>
        {/* TODO 다음에는 생성, 수정, 삭제 버튼을 넣자 */}
        <ul className={utilStyles.todoBtnList}>
          <li><a>생성</a></li>
          <li><a>수정</a></li>
          <li><input type="button" value="삭제"></input></li>
        </ul>
      </section>
    </Layout>
  )
}