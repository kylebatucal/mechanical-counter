'use client'

import { useState } from 'react'
 
function Wheel() {
  const numbers = [0,9,8,7,6,5,4,3,2,1]
  const diameter = 350;
  const radius = diameter / 2
  // const circumference = Math.PI * diameter
  const height = 113

  // Create segments
  const segments = numbers.map((digit, i) => {
    const style = {
      transform: `rotateX(${36*i}deg) translateZ(${radius}px)`,
      height: height
    }

    return (
      <div className='segment' style={style} key={digit.toString()}>
        {digit}
      </div>
    )
  })

  // Return wheel
  const [degrees, setDegrees] = useState(0)

  return (
    <div>
      <div 
        className='wheel'
        style={{
          transformOrigin: `50% calc(50% + ${height / 2}px)`,
          transform: `rotateX(${degrees}deg)`
        }}
      >
        {segments}
      </div>
      <button onMouseDown={() => {setDegrees(degrees+36)}}>Click me</button>
    </div>
  )
  
}

export default function Counter() {

  return (
    <div>
      <Wheel/>
    </div>
  )


  // const [thousands, setThousands] = useState(0)
  // const [hundreds, setHundreds] = useState(0)
  // const [tens, setTens] = useState(0)
  // const [ones, setOnes] = useState(0)

  // const incrementDigit = (digit: number, setDigit: Function) => {
  //   if (digit == 9) {
  //     setDigit(0)
  //     return true
  //   }
  //   setDigit(digit + 1)
  //   return false
  // }

  // const incrementCount = () => {
  //   if (incrementDigit(ones, setOnes)) {
  //     if (incrementDigit(tens, setTens)) {
  //       if (incrementDigit(hundreds, setHundreds)) {
  //         incrementDigit(thousands, setThousands)
  //       }
  //     }
  //   }
  // }

  // const resetCount = (event: any) => {
  //   if (event.deltaY < 0) {
  //     const lowestDigit = Math.min(...[thousands, hundreds, tens, ones])

  //     const resetDigit = (digit: number, setDigit: Function) => {
  //       if (digit == lowestDigit) {
  //         incrementDigit(digit, setDigit)
  //       }
  //     }

  //     resetDigit(thousands, setThousands)
  //     resetDigit(hundreds, setHundreds)
  //     resetDigit(tens, setTens)
  //     resetDigit(ones, setOnes)
  //   }
  // }

  // return (
  //   <div
  //     className='h-screen bg-black text-white'
  //     onMouseDown={incrementCount}
  //     onWheel={resetCount}
  //   >
  //     <div>
  //       {thousands}
  //     </div>
  //     <div>
  //       {hundreds}
  //     </div>
  //     <div>
  //       {tens}
  //     </div>
  //     <div>
  //       {ones}
  //     </div>
  //   </div>
  // )
}