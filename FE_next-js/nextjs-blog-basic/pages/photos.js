import React from 'react'
import HeadInfos from '../components/HeadInfos';
import Image from 'next/image';
import PhotosStyles from '../styles/Photos.module.css';
import Link from 'next/link';

const photos = ({ photos }) => {
  console.log(photos);
  return (
    <div>
      <HeadInfos title="My blog photos"/>
      <h1>My Photos</h1>
      
      <ul className={PhotosStyles.photos}>
        {/* 이렇게만 하면 이미지 불러올 때 에러가 나. 왜? thumbnailURL이 외부 이미지를 사용하기 때문 
          따라서 next.config.js에서 images -> domain 으로 지정해줘야 함
        */}
        {photos.map(photo => 
        (<Link href={"/photos/" + photo.id} key={photo.id}>
          <a>
            <li>
            <Image alt={photo.title} src={photo.thumbnailUrl} width={100} height={100} />
            <span>{photo.title}</span>
            </li>
          </a>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default photos

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`);
  const photos = await res.json();

  return {
    props: {photos}
  }
}