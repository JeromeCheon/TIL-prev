import remark from 'remark'
import html from 'remark-html'
// fs는 file system 인듯 
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    }
    else if (a > b) {
      return -1
    }
    else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id : fileName.replace(/\.md$/, '')
      }
    }
  })
}
// id가 주어졌을 때, 해당하는 포스트를 랜더링할 필요가 있지
// export function getPostData(id) {
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  /*
  // combine the data with the id
  return {
    id,
    ...matterResult.data
  }*/

  const processedContent = await remark() // 비동기적으로 기다려야 하기 때문에 함수 부분도 async 넣어줘야 
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}