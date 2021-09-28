import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';

const Photo = ({ photo }) => {
  // const router = useRouter();
  // console.log(router);
  const { title, url } = photo;
  return (
    <div>
      <h2>{title}</h2>
      <Image
        src={url}
        alt={title}
        width={500}
        height={500}
      />
      <Link href="/photos"><a>Go back</a></Link>
    </div>
  )
}

export default Photo;

export const getStaticProps = async (context) => {
  // 여기서 id값을 넣어주면 각 id를 갖는 포토만 출력 가능한데, 그렇게 하기 위해서
  // next.js의 useRoute 사용해보겠다
  const { id } = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const photo = await res.json();
  return {
    props: {
      photo
    }
  }
}
export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`);
  const photos = await res.json();
  const ids = photos.map(photo => photo.id);
  const paths = ids.map(id => {
    return {
      params: {id: id.toString()}
    }
  })
  return {
    paths: paths,
    fallback: false,
  }
}