import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import React, { useState, useEffect } from 'react'
const LayoutWrapper = ({ children }) => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }
  return (
    <>
      <SectionContainer>
        <header className="flex w-full px-4 sm:px-6 bg-opacity-30 dark:bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg bg-white dark:bg-dark sticky top-0 z-20 items-center justify-between py-4 ">
          <nav className="flex items-center justify-between w-full max-w-6xl mx-auto  sm:py-2 xl:max-w-6xl xl:px-0">
            <div className="">
              <Link href="/" aria-label="Lam Vu Hoang Blog">
                <div className="flex items-center justify-between">
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div className="h-7 text-2xl text-primary-500 font-semibold sm:block">
                      {siteMetadata.headerTitle}
                    </div>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
              </Link>
            </div>
            <div className="flex  items-center text-base leading-5">
              <div className="hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="p-1 font-semibold text-primary-500 rounded-md sm:p-4 dark:text-primary-500 dark:hover:bg-white dark:hover:bg-opacity-10 hover:bg-black hover:bg-opacity-10"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <div className="flex items-center sm:hidden">
                <button
                  type="button"
                  className="w-8 h-8 ml-1 mr-1 rounded"
                  aria-label="Toggle Menu"
                  onClick={onToggleNav}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {navShow ? (
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>
        <div
          className={`sm:hidden fixed w-full h-screen top-16 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
            navShow ? 'translate-x-0' : 'translate-x-full'
          } backdrop-filter bg-opacity-30 dark:bg-opacity-30 backdrop-saturate-150 backdrop-blur-lg`}
        >
          <button
            type="button"
            aria-label="toggle modal"
            className="fixed w-full h-full cursor-auto focus:outline-none"
            onClick={onToggleNav}
          ></button>
          <nav className="fixed h-full mt-8">
            {headerNavLinks.map((link) => (
              <div key={link.title} className="px-12 py-4">
                <Link
                  href={link.href}
                  className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                  onClick={onToggleNav}
                >
                  {link.title}
                </Link>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex max-w-6xl mx-auto px-4 sm:px-0 flex-col justify-between min-h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
