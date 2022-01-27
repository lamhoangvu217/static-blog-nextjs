import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
const MAX_DISPLAY = 5
import Twemoji from 'react-twemoji'
export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <div className="flex">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Xin chào
            </h1>
            <img src="/images/bongo.gif" className="w-20 h-14 ml-3" alt="" />
          </div>

          <p className="text-lg leading-7 text-gray-600 dark:text-gray-400">
            Mình là <span className="font-medium">Lâm</span> -{' '}
            <span className="font-medium">Software Engineer</span> tại{' '}
            <a
              href="https://kpim.vn/"
              target="_blank"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              rel="noreferrer"
            >
              KPIM
            </a>
            .
            <p className="my-4">
              Mình được tiếp cận với công nghệ từ năm học lớp 7 và đã dành rất nhiều thời gian để
              tìm tòi, khám phá những điều hay ho về nó. Nên đến năm lớp 9 mình đã có thể support
              hàng xóm sửa điện thoại nói riêng và các đồ công nghệ nói chung =))
            </p>
            <p className="my-4">
              Mình làm quen và hứng thú với lập trình từ năm 2019, lúc mình mới biết đến Frontend.
              Blog này là nơi note lại những kiến thức mà mình học được và những điều hay ho mình
              trải nghiệm khi đi làm!
            </p>
            <div className="flex">
              <p className="my-4">Hope u enjoy ur time here sir</p>
              <img src="/images/bugcat.gif" className="ml-2 w-16 h-14" alt="" />
            </div>
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
              <Link href={`/blog/${slug}`} key={slug} className="">
                <li
                  key={slug}
                  className="py-12 px-4 hover:bg-gray-100 dark:hover:bg-[#2f3640] hover:rounded-xl"
                >
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium pb-7 pt-1 leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date)}</time>
                          {/* <img
                            className="hidden md:w-full md:h-[165px] md:block   mt-1 rounded-xl"
                            src={images[0]}
                            alt=""
                          /> */}
                        </dd>
                      </dl>
                      <div className="space-y-2 xl:pl-5 xl:col-span-3">
                        <div className="space-y-2">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            {/* <div className="text-base font-medium pb-7 pt-1 leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={date}>{formatDate(date)}</time>
                            </div> */}

                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
