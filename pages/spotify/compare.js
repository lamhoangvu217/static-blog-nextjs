import React, { useEffect, useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as SpotifyApi from '@/lib/spotify-api'
import { useSpring, animated, config } from 'react-spring'

function getProfile(token) {
  return axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

function getTop(type, token) {
  return Promise.all([
    axios.get(
      'https://api.spotify.com/v1/me/top/' + type + `?time_range=short_term&limit=50&offset=0`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),
    axios.get(
      'https://api.spotify.com/v1/me/top/' + type + `?time_range=long_term&limit=50&offset=0`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),
  ])
}

function getArtists(list, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.spotify.com/v1/artists?ids=${encodeURI(list)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => resolve(data.data.artists))
      .catch((e) => reject(e))
  })
}
function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
export default function Compare({
  thinh_profile,
  thinh_top_artists,
  thinh_top_tracks,
  thinh_top_genres,
}) {
  const router = useRouter()
  const [redirect_url, setredirect_url] = useState()
  const [access_token, setAccess_token] = useState()
  const [genres_common, setgenres_common] = useState()
  const [tracks_common, settracks_common] = useState()
  const [artists_common, setartists_common] = useState()
  const [profile, setprofile] = useState()

  useEffect(() => {
    let query = router.asPath.split('#')[1]
    if (!query) return
    let obj = JSON.parse(
      '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === '' ? value : decodeURIComponent(value)
      }
    )
    setAccess_token(obj.access_token)
    window.localStorage.setItem('access_token', obj.access_token)
    router.replace('/spotify/compare')
  }, [router])
  useEffect(() => {
    if (typeof window != undefined) {
      setredirect_url(
        `https://accounts.spotify.com/authorize?client_id=651388d70a8149658dc770cf641208e7&redirect_uri=${window.location.href}&scope=user-read-private,user-read-recently-played,user-top-read&response_type=token`
      )
      setAccess_token(window.localStorage.getItem('access_token'))
    }
  }, [])
  useEffect(() => {
    function getCommon(type, data, thinh_data) {
      let thinh = thinh_data[type]
      let tracks = []
      for (let i = 0; i < thinh.items.length; i++)
        for (let j = 0; j < data.items.length; j++) {
          if (thinh.items[i].id == data.items[j].id)
            tracks.push({ ...thinh.items[i], rank: { me: j + 1, thinh: i + 1 } })
        }
      tracks.sort((a, b) => a.rank.me - b.rank.me + a.rank.thinh - b.rank.thinh)
      return tracks
    }
    if (access_token)
      getProfile(access_token)
        .then((data) => data.data)
        .then((data) => {
          setprofile(data)
          getTop('tracks', access_token).then(async (data) => {
            settracks_common({
              short_term: getCommon('short_term', data[0].data, thinh_top_tracks),
              long_term: getCommon('long_term', data[1].data, thinh_top_tracks),
            })
            const artistsList = data[1].data.items.map((e) => e.artists.map((e) => e.id)).flat()
            const top_artists_by_tracks = []
            for (let i = 0; i < artistsList.length; i += 50) {
              let temp = await getArtists(artistsList.slice(i, i + 50), access_token)
              top_artists_by_tracks.push(...temp)
            }
            const obj = {}
            for (const e of top_artists_by_tracks) {
              for (const g of e.genres) {
                if (!obj[g]) obj[g] = 1
                else obj[g] += 1
              }
            }
            let top_genres = []
            let total = 0
            for (let [name, count] of Object.entries(obj)) {
              top_genres.push({ name, count })
              total += count
            }
            top_genres = top_genres.map((e) => ({
              ...e,
              percent: (e.count / total) * 100,
            }))
            top_genres.sort((a, b) => b.count - a.count)

            let genres = []
            for (let i = 0; i < top_genres.length; i++)
              for (let j = 0; j < thinh_top_genres.length; j++) {
                if (top_genres[i].name == thinh_top_genres[j].name)
                  genres.push({
                    name: top_genres[i].name,
                    count: { me: top_genres[i].count, thinh: thinh_top_genres[j].count },
                    percent: { me: top_genres[i].percent, thinh: thinh_top_genres[j].percent },
                  })
              }
            genres.sort((a, b) => b.percent.me - a.percent.me + b.percent.thinh - a.percent.thinh)
            setgenres_common(genres)
          })
          getTop('artists', access_token).then((data) => {
            setartists_common({
              short_term: getCommon('short_term', data[0].data, thinh_top_artists),
              long_term: getCommon('long_term', data[1].data, thinh_top_artists),
            })
          })
        })
        .catch((e) => {
          setAccess_token(false)
          window.localStorage.removeItem('access_token')
        })
  }, [access_token])
  function logout() {
    setAccess_token(false)
    window.localStorage.removeItem('access_token')
  }
  return (
    <div>
      <PageSEO
        title={`Spotify Compare - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="w-full">
        {access_token && (
          <div className="flex justify-between mb-5">
            <p className="text-xl font-bold">Spotify Compare</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
        {!access_token && redirect_url && (
          <a
            href={redirect_url}
            className="flex items-center justify-center gap-3 px-10 py-4 text-white rounded-md bg-spotify"
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M19.098 10.638C15.23 8.341 8.85 8.13 5.157 9.251a1.121 1.121 0 11-.651-2.148c4.239-1.287 11.285-1.038 15.738 1.605a1.123 1.123 0 01-1.146 1.93zm-.126 3.403a.937.937 0 01-1.287.308c-3.225-1.982-8.142-2.557-11.958-1.399a.936.936 0 11-.543-1.79c4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267a.746.746 0 01-1.028.249c-2.818-1.722-6.365-2.111-10.542-1.157a.748.748 0 01-.333-1.458c4.571-1.045 8.492-.595 11.655 1.338a.747.747 0 01.248 1.028zM12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"></path>
            </svg>
            Login Spotify to continue
          </a>
        )}

        {access_token && (
          <div>
            {profile && (
              <div className="flex items-center justify-center gap-3 mb-10">
                <a
                  target="_blank"
                  className="flex flex-col items-center gap-2"
                  rel="noreferrer"
                  href={profile.external_urls.spotify}
                >
                  <img
                    className="w-20 h-20 border-2 rounded-full dark:border-spotify"
                    src={profile.images[0].url}
                    alt=""
                  />
                  {profile.display_name}
                </a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  target="_blank"
                  className="flex flex-col items-center gap-2"
                  rel="noreferrer"
                  href={thinh_profile.external_urls.spotify}
                >
                  <img
                    className="w-20 h-20 border-2 rounded-full dark:border-spotify"
                    src={thinh_profile.images[0].url}
                    alt=""
                  />
                  {thinh_profile.display_name}
                </a>
              </div>
            )}
            <Percent
              tracks_common={tracks_common}
              artists_common={artists_common}
              genres_common={genres_common}
            />
            <CommonGenres
              genres_common={genres_common}
              profile={profile}
              thinh_profile={thinh_profile}
            />
            <CommonArtists thinh_profile={thinh_profile} artists_common={artists_common} />
            <CommonTracks thinh_profile={thinh_profile} tracks_common={tracks_common} />
          </div>
        )}
      </div>
    </div>
  )
}
function Percent({ tracks_common, artists_common, genres_common }) {
  const [tracksPercent, settracksPercent] = useState(0)
  const [artistsPercent, setartistsPercent] = useState(0)
  const [genresPercent, setgenresPercent] = useState(0)
  const { number } = useSpring({
    from: { number: 0 },
    number: tracksPercent + artistsPercent + genresPercent,
    config: config.molasses,
    delay: 500,
  })

  useEffect(() => {
    if (tracks_common) {
      settracksPercent(scale((tracks_common.long_term.length / 50) * 100, 0, 100, 0, 25))
    }
    if (artists_common) {
      setartistsPercent(scale((artists_common.long_term.length / 50) * 100, 0, 100, 0, 25))
    }
  }, [tracks_common, artists_common])
  useEffect(() => {
    if (genres_common) {
      const total_count = Math.max(
        genres_common.reduce((previous, current) => previous + current.count.me, 0),
        genres_common.reduce((previous, current) => previous + current.count.thinh, 0)
      )
      const count = genres_common.reduce(
        (previous, current) => previous + Math.min(current.count.me, current.count.thinh),
        0
      )
      setgenresPercent(scale((count / total_count) * 100, 0, 100, 0, 50))
    }
  }, [genres_common])
  return (
    <div className="pb-10 text-5xl font-bold text-center tabular-nums md:text-9xl">
      <animated.div className="inline">{number.to((n) => n.toFixed(2))}</animated.div>%
    </div>
  )
}

function CommonGenres({ genres_common, thinh_profile, profile }) {
  const [showMore, setshowMore] = useState(false)
  if (!genres_common) return null
  return (
    <div className="my-10">
      <div className="flex flex-col justify-between gap-2 mb-3 md:gap-5 md:flex-row">
        <p className="text-2xl font-bold">Common genres</p>
      </div>
      <p className="mt-10 text-center mb-14">
        Your top genres vs {thinh_profile.display_name} of all time.
      </p>
      <div className="p-5 bg-gray-100 rounded-md shadow dark:bg-gray-800 ">
        <div className="flex justify-between font-bold md:text-xl">
          <span className="text-blue-600">{profile.display_name}</span>
          <span className="text-red-600">{thinh_profile.display_name}</span>
        </div>
        <div className="divide-y-2 dark:divide-gray-700 ">
          {genres_common.slice(0, showMore ? 100 : 5).map((e) => (
            <div className="w-full py-4" key={e.name}>
              <div className="flex justify-between gap-5 font-semibold md:text-lg">
                <span className="w-16">
                  {Math.floor(scale(e.percent.me, 0, e.percent.me + e.percent.thinh, 0, 100))}%
                </span>
                <span className="text-center capitalize">{e.name}</span>
                <span className="w-16 text-right">
                  {Math.floor(scale(e.percent.thinh, 0, e.percent.me + e.percent.thinh, 0, 100))}%
                </span>
              </div>
              <div className="w-full h-5 my-2 bg-red-600">
                <div
                  className="h-full bg-blue-600"
                  style={{
                    width: scale(e.percent.me, 0, e.percent.me + e.percent.thinh, 0, 100) + '%',
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">{e.percent.me.toFixed(2)}% of all time</span>
                <span className="text-red-600">{e.percent.thinh.toFixed(2)}% of all time</span>
              </div>
            </div>
          ))}
        </div>
        {genres_common.length > 5 && (
          <div className="w-full">
            <button
              className="block mx-auto text-lg underline text-spotify"
              onClick={() => setshowMore(!showMore)}
            >
              {!showMore ? 'Show more ▼' : 'Show less ▲'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
function CommonArtists({ artists_common, thinh_profile }) {
  const [time_range, settime_range] = useState('long_term')
  const [showMore, setshowMore] = useState(false)
  if (!artists_common) return null
  return (
    <div className="my-10">
      <div className="flex flex-col justify-between gap-2 mb-3 md:gap-5 md:flex-row">
        <p className="text-2xl font-bold">Common artists</p>
        <div className="flex gap-5 text-sm">
          <button
            type="button"
            onClick={() => settime_range('short_term')}
            className={`font-semibold duration-300 uppercase dark:hover:text-white hover:text-black rounded-none ${
              time_range == 'short_term' ? 'border-b-4 border-spotify' : 'text-gray-500'
            }`}
          >
            4 week
          </button>
          <button
            type="button"
            onClick={() => settime_range('long_term')}
            className={`font-semibold duration-300 uppercase dark:hover:text-white hover:text-black rounded-none ${
              time_range == 'long_term' ? 'border-b-4 border-spotify' : 'text-gray-500'
            }`}
          >
            all time
          </button>
        </div>
      </div>
      <p className="mt-10 text-center mb-14">
        You and {thinh_profile.display_name} have {artists_common[time_range].length} artists in
        common in your top 50 artists of {time_range == 'long_term' ? 'all time' : 'the last month'}
        .
      </p>
      <p className="mb-2 text-right">Rank: Yours / Thinh's</p>
      <div className="flex flex-wrap items-center gap-5 justify-evenly">
        {artists_common[time_range].slice(0, showMore ? 50 : 12).map((e, i) => (
          <a
            target="_blank"
            href={e.external_urls.spotify}
            key={i}
            rel="noreferrer"
            className="hover:scale-110 duration-300  ease-in-out flex items-center w-full gap-3 p-3 bg-gray-100 shadow rounded-lg dark:bg-gray-800 md:w-[20rem]"
          >
            <img
              className="object-cover w-20 h-20 rounded-lg"
              src={
                e?.images[0]?.url ||
                `https://ui-avatars.com/api/?background=1db954&color=fff&name=${e.name}`
              }
              alt=""
            />
            <div className="truncate">
              <p className="font-semibold ">{e.name}</p>
              <p>
                {e.rank.me} / {e.rank.thinh}
              </p>
            </div>
          </a>
        ))}
        {artists_common[time_range].length > 12 && (
          <div className="w-full">
            <button
              className="block mx-auto text-lg underline text-spotify"
              onClick={() => setshowMore(!showMore)}
            >
              {!showMore ? 'Show more ▼' : 'Show less ▲'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CommonTracks({ tracks_common, thinh_profile }) {
  const [time_range, settime_range] = useState('long_term')
  const [showMore, setshowMore] = useState(false)
  if (!tracks_common) return null
  return (
    <div className="my-10">
      <div className="flex flex-col justify-between gap-2 mb-3 md:gap-5 md:flex-row">
        <p className="text-2xl font-bold">Common tracks</p>
        <div className="flex gap-5 text-sm">
          <button
            type="button"
            onClick={() => settime_range('short_term')}
            className={`font-semibold duration-300 uppercase dark:hover:text-white hover:text-black rounded-none ${
              time_range == 'short_term' ? 'border-b-4 border-spotify' : 'text-gray-500'
            }`}
          >
            4 week
          </button>
          <button
            type="button"
            onClick={() => settime_range('long_term')}
            className={`font-semibold duration-300 uppercase dark:hover:text-white hover:text-black rounded-none ${
              time_range == 'long_term' ? 'border-b-4 border-spotify' : 'text-gray-500'
            }`}
          >
            all time
          </button>
        </div>
      </div>
      <p className="mt-10 text-center mb-14">
        You and {thinh_profile.display_name} have {tracks_common[time_range].length} tracks in
        common in your top 50 tracks of {time_range == 'long_term' ? 'all time' : 'the last month'}.
      </p>
      <p className="mb-2 text-right">Rank: Yours / Thinh's</p>
      <div className="flex flex-wrap items-center gap-5 justify-evenly">
        {tracks_common[time_range].slice(0, showMore ? 50 : 12).map((e, i) => (
          <a
            className="hover:scale-110 duration-300 ease-in-out flex items-center w-full gap-3 p-3 bg-gray-100 shadow rounded-lg dark:bg-gray-800 md:w-[20rem]"
            target="_blank"
            href={e.external_urls.spotify}
            key={i}
            rel="noreferrer"
          >
            <img
              className="object-cover w-20 h-20 rounded-lg"
              src={
                e.album.images[0].url ||
                `https://ui-avatars.com/api/?background=1db954&color=fff&name=${e.name}`
              }
              alt=""
            />
            <div className="truncate">
              <p className="font-semibold ">{e.name}</p>
              <p>{e.artists.map((e, i) => `${i != 0 ? ', ' : ''}${e.name}`)}</p>
              <p>
                {e.rank.me} / {e.rank.thinh}
              </p>
            </div>
          </a>
        ))}
        {tracks_common[time_range].length > 12 && (
          <div className="w-full">
            <button
              className="block mx-auto text-lg underline text-spotify"
              onClick={() => setshowMore(!showMore)}
            >
              {!showMore ? 'Show more ▼' : 'Show less ▲'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const thinh_profile = await SpotifyApi.getMe()
  let [short_term, long_term] = await Promise.all([
    SpotifyApi.getTop('artists', 'short_term'),
    SpotifyApi.getTop('artists', 'long_term'),
  ])

  const thinh_top_artists = { long_term, short_term }
  ;[short_term, long_term] = await Promise.all([
    SpotifyApi.getTop('tracks', 'short_term'),
    SpotifyApi.getTop('tracks', 'long_term'),
  ])
  const thinh_top_tracks = { long_term, short_term }

  //get by all time
  const artistsList = long_term.items.map((e) => e.artists.map((e) => e.id)).flat()

  const top_artists_by_tracks = []
  for (let i = 0; i < artistsList.length; i += 50) {
    let temp = await SpotifyApi.getArtists(artistsList.slice(i, i + 50))
    top_artists_by_tracks.push(...temp)
  }

  const obj = {}
  for (const e of top_artists_by_tracks) {
    for (const g of e.genres) {
      if (!obj[g]) obj[g] = 1
      else obj[g] += 1
    }
  }
  let thinh_top_genres = []
  let total = 0
  for (let [name, count] of Object.entries(obj)) {
    thinh_top_genres.push({ name, count })
    total += count
  }
  thinh_top_genres = thinh_top_genres.map((e) => ({ ...e, percent: (e.count / total) * 100 }))
  thinh_top_genres.sort((a, b) => b.count - a.count)

  return {
    props: {
      thinh_profile,
      thinh_top_artists,
      thinh_top_tracks,
      thinh_top_genres,
    },
    revalidate: 60 * 60 * 24,
  }
}
