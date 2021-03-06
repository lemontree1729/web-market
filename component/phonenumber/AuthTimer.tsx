import { NextPage } from 'next';
import React, { useEffect, useState, useRef } from 'react'


const AuthTimer: NextPage<{ openCetification: Function, ValidationAuthNumber: boolean }> = ({ openCetification, ValidationAuthNumber }) => {
  const [min, setMin] = useState(2)
  const [sec, setSec] = useState(59)
  const time = useRef(179);
  const timerId: any = useRef(null)
  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(Math.floor(time.current / 60))
      setSec(Math.floor(time.current % 60))
      time.current -= 1
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])
  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current)
      if (ValidationAuthNumber === false) {
        alert("인증시간이 지났습니다.")
        openCetification(false)
      }
    }
  }, [sec])

  return (
    <div className="timer">
      {min}:{sec}
    </div>
  )
}
export default AuthTimer