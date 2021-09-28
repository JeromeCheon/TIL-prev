import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Footer from '../components/Footer'
import Top from '../components/Top'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  // pageProps는 data fetching을 이용해 미리 가져온 초기 데이터 
  return (
    <RecoilRoot>
      <div style={{width: 1000, margin: "0 auto"}}>
        <Top/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </RecoilRoot>
  )
}

export default MyApp


/*
- _app.js 페이지 전환시 레이아웃 유지
- 페이지 전환시 상태값 유지
- componentDidCatch 사용해서 커스텀 에러 핸들링 할 수 있음
- 추가적인 데이터를 페이지로 주입시켜주는 게 가능 
- 글로벌 css  는 여기에 선언함 

*/