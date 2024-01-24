'use client'

import { useState } from 'react'

function Wheel({ digit=0 }) {
  const numbers = [0,1,2,3,4,5,6,7,8,9]
  const diameter = 200 // in pixels
  const radius = diameter / 2
  const segmentHeight = (3.25 * diameter) / numbers.length // Because it is not a perfect circle we make pi = 3.25
  const angle = 36

    const segments = numbers.map((digit, i) => {
      const segmentTransform = {
        transform: `rotateX(${-angle*i}deg) translateZ(${radius}px)`,
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
    transform: `rotateX(${angle * digit}deg)`  
  }

  return (
    <div className='wheel' style={wheelTransform}>
      {segments}
    </div>
  )
}

export default function Counter({ startingValue = 0 }) {
  const [count, setCount] = useState(startingValue)


  return (
    <div 
      className='h-screen' 
      onMouseDown={e => setCount(count + 1)}
    >
      <div className='border h-full bg-fuchsia-200 flex'>
        <Wheel digit={Math.floor(count / 1000)}/>
        <Wheel digit={Math.floor(count / 100)}/>
        <Wheel digit={Math.floor(count / 10)}/>
        <Wheel digit={count}/>
      </div>
    </div>
  )


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