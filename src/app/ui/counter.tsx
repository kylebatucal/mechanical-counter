'use client'

import { useState } from 'react'
 
// function Wheel() {
//   // Return wheel
//   const [degrees, setDegrees] = useState(0)

//   return (
//     <div>
//       <div 
//         className='wheel'
//         style={{
//           transformOrigin: `50% calc(50% + ${height / 2}px)`,
//           transform: `rotateX(${degrees}deg) rotateY(30deg)`
//         }}
//       >
//         {segments}
//       </div>
//       <button onMouseDown={() => {setDegrees(degrees+36)}}>Click me</button>
//     </div>
//   )
// }



function Wheel() {
  const numbers = [0,1,2,3,4,5,6,7,8,9]
  const diameter = 200 // in pixels
  const radius = diameter / 2
  const segmentHeight = (3.25 * diameter) / numbers.length // Because it is not a perfect circle we make pi = 3.25

    const segments = numbers.map((digit, i) => {
      const segmentTransform = {
        transform: `rotateX(${-(360/numbers.length)*i}deg) translateZ(${radius}px)`,
        height: segmentHeight,
        top: `calc(50% - ${segmentHeight / 2}px)`
      }
      return (
        <div 
        className='segment absolute w-full flex items-center justify-center text-5xl' 
        style={segmentTransform} 
        key={digit.toString()}>
          {digit}
        </div>
      )
  })


  const wheelTransform = {
    transformOrigin: 'center',
    // transform: `rotateX(${degrees}deg) rotateY(30deg)`  
  }
  return (
    <div className='wheel' style={wheelTransform}>
      {segments}
    </div>
  )
}

export default function Counter() {

  return (
    <div className='h-screen'>
      <div className='border bg-fuchsia-200'>
        <Wheel/>
      </div>
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