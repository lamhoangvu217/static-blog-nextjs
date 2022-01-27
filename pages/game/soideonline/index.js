import React, { Fragment, useState } from 'react'
const SoiDeOnline = () => {
  const [inputDream, setInputDream] = useState('')
  const [buttonDreamStatus, setButtonDream] = useState(true)
  const [status, setStatus] = useState(false)
  const [dreamStatus, setDreamStatus] = useState(false)
  const [waitStatus, setWaitStatus] = useState(false)
  const [seconds, setSeconds] = useState(3)
  const [ketqua, setketqua] = useState(false)
  const countdown = () => {
    window.timer = setInterval(function () {
      setSeconds((seconds) => seconds - 1)
    }, 1000)
  }
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const showInputDream = () => {
    if (status === true) {
      return (
        <div className="flex flex-col justify-center items-center">
          <form>
            <textarea
              className="w-[500px] border-2 rounded-md dark:text-white dark:bg-[#22272E] focus:border-[#8e44ad] h-24 mt-4"
              placeholder={'Nhập giấc mơ của bạn tại đây'}
              onChange={(e) => setInputDream(e.target.value)}
            />
          </form>
          <button
            className="bg-[#2ecc71] text-white px-5 py-2 mt-4"
            type="button"
            onClick={() => {
              setDreamStatus(!dreamStatus)
              setStatus(!status)
              setButtonDream(!buttonDreamStatus)
              setWaitStatus(!waitStatus)
              countdown()
            }}
          >
            Soi đề
          </button>
        </div>
      )
    }
  }

  const WaitDream = () => {
    if (waitStatus === true) {
      return (
        <h1
          style={{
            color: 'var(--green)',
            fontSize: '26px',
            marginTop: '27px',
            fontFamily: 'Alata, sans-serif',
          }}
        >
          Chờ trong giây lát...
          {seconds >= 0
            ? seconds
            : setWaitStatus(!waitStatus) + setketqua(!ketqua) + clearInterval(window.timer)}
        </h1>
      )
    }
  }
  const showDreamStatus = () => {
    if (dreamStatus === true) {
      return (
        <div className="mt-4 text-center">
          <h3 className="text-2xl">
            Giấc mơ của bạn là: <h3 className="text-[#2ecc71] font-bold">{inputDream}</h3>
          </h3>
        </div>
      )
    }
  }

  const buttonDream = () => {
    if (buttonDreamStatus === true) {
      return (
        <button
          className="bg-[#8e44ad] text-white rounded-md p-4 mt-4"
          type="button"
          onClick={() => setStatus(!status)}
        >
          Nhập vào giấc mơ của bạn
        </button>
      )
    }
  }
  const result = () => {
    if (ketqua === true) {
      return (
        <div>
          <h1
            style={{
              marginTop: '17px',
              fontSize: '36px',
              fontFamily: 'Alata, sans-serif',
            }}
          >
            Đề hôm nay sẽ về
          </h1>
          <h1 className="text-[70px] text-center font-semibold text-red-600">
            {getRandomNumberBetween(10, 99)}
          </h1>
        </div>
      )
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center dark:bg-[#2f3640] bg-gray-200 px-10 py-5 rounded-xl ">
        <h1 className="block text-3xl text-center font-bold ">Soi đề Online</h1>
        <span className="text-gray-500 dark:text-gray-400 block mt-2 mx-auto text-center">
          Đêm qua bạn mơ đến người cũ và không biết nên đánh con gì để ăn to. Hãy nhập giấc mơ xuống
          bên dưới
        </span>
      </div>

      {buttonDream()}
      <div className="container">
        <div className="row">
          <div className="col">{showInputDream()}</div>
        </div>
      </div>

      {showDreamStatus()}
      {/* SOI DE */}
      {WaitDream()}
      {result()}
    </div>
  )
}

export default SoiDeOnline
