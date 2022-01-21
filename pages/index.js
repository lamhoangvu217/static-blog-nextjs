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
          {/* <h1 className="my-28 sm:my-10 text-center select-none text-8xl sm:text-8.5xl leading-none tracking-tightest font-extrabold">
            <span
              data-content="Blog."
              className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-white dark:before:text-transparent before:animate-gradient-background-1"
            >
              <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1">
                Blog.
              </span>
            </span>
            <span
              data-content="Showcase."
              className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-white dark:before:text-transparent before:animate-gradient-background-2"
            >
              <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2">
                Showcase.
              </span>
            </span>
            <span
              data-content="Portfolio."
              className="relative block before:content-[attr(data-content)] dark:before:content-[attr(data-content)] before:w-full before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:px-2 before:text-center before:text-white dark:before:text-transparent before:animate-gradient-background-3"
            >
              <span className="px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3">
                Portfolio.
              </span>
            </span>
            
          </h1> */}
          {/* <h1 className="text-4xl font-bold leading-7 text-black dark:text-white">Dev Vũ Wonderland</h1> */}
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p> */}
          <div className="flex">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Xin chào
            </h1>
            <img src="/images/bongo.gif" className="w-20 ml-3" alt="" />
          </div>

          <p className="text-lg leading-7 text-gray-600 dark:text-gray-400">
            Mình là <span className="font-medium">Lâm</span> -{' '}
            <span className="font-medium">Frontend Developer</span> tại{' '}
            <a
              href="https://kpim.vn/"
              target="_blank"
              className="text-primary-400 hover:text-primary-600 dark:hover:text-primary-400"
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
            <p className="my-4">Hope u enjoy ur time here sir</p>
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
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
