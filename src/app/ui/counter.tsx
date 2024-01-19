'use client'

import { useState } from 'react'
 
export default function Counter() {
  const [thousands, setThousands] = useState(0)
  const [hundreds, setHundreds] = useState(0)
  const [tens, setTens] = useState(0)
  const [ones, setOnes] = useState(0)

  const incrementDigit = (digit: number, setDigit: Function) => {
    if (digit == 9) {
      setDigit(0)
      return true
    }
    setDigit(digit + 1)
    return false
  }

  const incrementCount = () => {
    if (incrementDigit(ones, setOnes)) {
      if (incrementDigit(tens, setTens)) {
        if (incrementDigit(hundreds, setHundreds)) {
          incrementDigit(thousands, setThousands)
        }
      }
    }
  }

  const resetCount = (event: any) => {
    if (event.deltaY < 0) {
      const lowestDigit = Math.min(...[thousands, hundreds, tens, ones])

      const resetDigit = (digit: number, setDigit: Function) => {
        if (digit == lowestDigit) {
          incrementDigit(digit, setDigit)
        }
      }

      resetDigit(thousands, setThousands)
      resetDigit(hundreds, setHundreds)
      resetDigit(tens, setTens)
      resetDigit(ones, setOnes)
    }
  }

  return (
    <div
      className='h-screen bg-black text-white'
      onMouseDown={incrementCount}
      onWheel={resetCount}
    >
      <div>
        {thousands}
      </div>
      <div>
        {hundreds}
      </div>
      <div>
        {tens}
      </div>
      <div>
        {ones}
      </div>
    </div>
  )


  // const [count, setCount] = useState(0)



  // return (
  //   <div
  //     className="h-screen bg-black text-white"
  //     onMouseDown={() => setCount(count + 1)}
  //     onWheel={(event) => {if (event.deltaY < 0) { setCount(0) }}}
  //   >
  //     <div>
  //       Count: {count}
  //     </div>
  //     <div className="digit thousands">
  //       0
  //     </div>
  //     <div className="digit hundreds">
  //       0
  //     </div>
  //     <div className="digit tens">
  //       0
  //     </div>
  //     <div className="digit ones">
  //       0
  //     </div>
  //   </div>
  // )
}