'use client'

import { MouseEvent, WheelEvent, useState } from 'react'
import useSound from 'use-sound'
import { set } from 'zod'

function Wheel({ digit = 0 }) {
  // Parameters
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const diameter = 400
  const radius = diameter / 2
  const segmentHeight = (3.25 * diameter) / numbers.length // Because it is not a perfect circle we make pi = 3.25
  const angle = 360 / numbers.length

  // Create wheel segments
  const segments = numbers.map((digit, i) => {
    const segmentTransform = {
      transform: `rotateX(${-angle * i}deg) translateZ(${radius}px)`,
      height: segmentHeight,
      top: `calc(50% - ${segmentHeight / 2}px)`,
    }

    return (
      <div
        className="segment w-full absolute flex items-center justify-center text-[8.5rem] select-none bg-[#212121] dark:bg-[#FAF9F6] text-[#FAF9F6]  dark:text-black"
        style={segmentTransform}
        key={digit.toString()}
      >
        {digit}
      </div>
    )
  })

  // Create wheel
  const wheelTransform = {
    transformOrigin: 'center',
    transform: `rotateX(${angle * digit}deg)`,
  }

  return (
    <div className="wheel w-[5rem]" style={wheelTransform}>
      {segments}
    </div>
  )
}

export default function Counter({ startingValue = 0 }) {
  // Initalize digits if a starting value was given
  const digits = [0, 0, 0, 0]
  if (startingValue) {
    const str = String(startingValue)
    const len = str.length
    for (let i = 0; i < len; i++) {
      digits[i + (digits.length - len)] = Number(str[i])
    }
  }

  // Initalize sound
  const [playSound] = useSound('/click.mp3', {
    sprite: {
      clickDown: [160, 100],
      clickUp: [370, 100],
      rotate: [600, 100],
    },
    interrupt: true,
  })

  // Separate useStates for each digit because each wheel needs to move independently (resetCount)
  const [thousands, setThousands] = useState(digits[0])
  const [hundreds, setHundreds] = useState(digits[1])
  const [tens, setTens] = useState(digits[2])
  const [ones, setOnes] = useState(digits[3])

  // Increment function
  const PLAY = 0.25 // This variable makes the wheel go a little bit past where it's supposed to go
  const incrementCount = (event: MouseEvent) => {
    setOnes(Math.floor(ones) + 1 + PLAY) // Floor the digit in case the play didn't reset
    if ((ones + 1) % 10 == 0) {
      // + 1 because useState() is always 1 behind for some reason
      setTens(Math.floor(tens) + 1 + PLAY)
      if ((tens + 1) % 10 == 0) {
        setHundreds(Math.floor(hundreds) + 1 + PLAY)
        if ((hundreds + 1) % 10 == 0) {
          setThousands(Math.floor(thousands) + 1 + PLAY)
        }
      }
    }
    playSound({ id: 'clickDown' })
  }

  // MouseUp function
  const relieve = (event: MouseEvent) => {
    // Check if each digit has a bit of play in it
    if (ones % 1 != 0) {
      setOnes(ones - PLAY)
    }
    if (tens % 1 != 0) {
      setTens(tens - PLAY)
    }
    if (hundreds % 1 != 0) {
      setHundreds(hundreds - PLAY)
    }
    if (thousands % 1 != 0) {
      setThousands(thousands - PLAY)
    }
    playSound({ id: 'clickUp' })
  }

  // Reset function
  const resetCount = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      const digits = [hundreds, tens, ones]
      const setDigits = [setHundreds, setTens, setOnes]

      // Check each digit if it is equal to the thousand's digit
      digits.map((digit, i) => {
        digit = Math.floor(digit) // Floor the digit in case the play didn't reset
        if (thousands % 1 != 0) {
          setThousands(thousands - PLAY)
        }
        if (digit % 10 == Math.floor(thousands) % 10) {
          // get last digit
          setDigits[i](digit + 1)
        }
      })

      // Increment each digit
      setThousands(thousands + 1)
      playSound({ id: 'rotate' })
    }
  }

  return (
    <div
      className="h-full flex items-center justify-center bg-stone-300 dark:bg-[#212121]"
      onPointerDown={incrementCount}
      onPointerUp={relieve}
      onWheel={resetCount}
    >
      <div className="flex frame">
        <Wheel digit={thousands} />
        <Wheel digit={hundreds} />
        <Wheel digit={tens} />
        <Wheel digit={ones} />
      </div>
    </div>
  )
}
