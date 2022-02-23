import Link from '@/components/Link'
import React, { useState, useRef, useEffect } from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { ProgressBar } from 'scrolling-based-progressbar'
import Comments from '@/components/comments'
import { FacebookShareButton, FacebookIcon } from 'next-share'
const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children, toc }) {
  const { slug, fileName, date, title, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <article>
        <ProgressBar height="5px" color="#6c5ce7" bgColor="transparent" />
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div
              className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2"
              style={{ marginBottom: '20px' }}
            >
              <div
                className="pt-10 pb-8 prose dark:prose-dark max-w-none"
                // style={{ userSelect: 'none' }}
              >
                {children}
              </div>
              <div
                style={{
                  borderTopWidth: '0px',
                  borderBottomWidth: '0px',
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              ></div>
            </div>

            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Danh mục
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Bài viết trước
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Bài viết tiếp theo
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="sticky top-0 pt-4 xl:pt-8">
                <Link
                  href="/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Quay về trang chủ
                </Link>
                <div className="hidden md:block">
                  <TocComponent toc={toc} />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

function TocComponent({ toc }) {
  const [activeId, setActiveId] = useState()
  useIntersectionObserver(setActiveId)
  const [TOC, setTOC] = useState([])
  useEffect(() => {
    let etoc = toc.map((e) => ({ ...e, children: [] }))
    for (let i = etoc.length - 1; i >= 0; i--) {
      if (etoc[i].depth == 1) continue
      for (let j = i; j >= 0; j--) {
        if (etoc[i].depth - etoc[j].depth == 1) {
          etoc[j].children.unshift(etoc[i])
          etoc[i].remove = true
          break
        }
      }
    }
    setTOC(etoc.filter((e) => !e.remove))
  }, [toc])

  let RenderToc = ({ item, activeId }) => {
    const isActive = (e) => {
      if ('#' + activeId === e.url) return true
      for (let i of e.children) if (isActive(i)) return true
      return false
    }
    return item.map((e, i) => (
      <div key={i}>
        <Link href={e.url}>
          <p
            className={`pl-2 border-l-[3px] ${
              isActive(e) && 'border-primary-500 text-primary-600'
            }`}
          >
            {e.value}
          </p>
        </Link>
        {isActive(e) && e.children.length > 0 && (
          <div className="mt-1 ml-4 space-y-1">
            <RenderToc item={e.children} activeId={activeId} />
          </div>
        )}
      </div>
    ))
  }

  return (
    toc.length > 0 && (
      <div className="mt-5 space-y-1 text-sm">
        <p className="text-lg font-bold">Mục lục</p>
        <RenderToc item={TOC} activeId={activeId} />
      </div>
    )
  )
}
const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({})
  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id) => headingElements.findIndex((heading) => heading.id === id)

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
      threshold: 0.4,
    })

    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}
