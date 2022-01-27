import React from 'react'
import { PageSEO } from '@/components/SEO'
import GameCard from '@/components/GameCard'
import siteMetadata from '@/data/siteMetadata'
import gameData from '@/data/gamesData'
function GamePage() {
  return (
    <>
      <PageSEO
        title={`GamingLand - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            GamingLand
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Các game nhảm lon mình tạo bạn có thể chơi ở đây :D Have fun
          </p>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap justify-center -m-4">
            {/* {gameData.map((d) => (
              <GameCard
                key={d.title}
                title={d.title}
                description={d.description}
                href={d.href}
                imgSrc={d.imgSrc}
              />
            ))} */}
            <span className="font-semibold text-2xl">Comming Soon in 2022...</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default GamePage
