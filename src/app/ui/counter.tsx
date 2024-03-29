"use client";

import { useState, MouseEvent, WheelEvent } from "react";

function Wheel({ digit = 0 }) {
  // Parameters
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const diameter = 400;
  const radius = diameter / 2;
  const segmentHeight = (3.25 * diameter) / numbers.length; // Because it is not a perfect circle we make pi = 3.25
  const angle = 360 / numbers.length;

  // Create wheel segments
  const segments = numbers.map((digit, i) => {
    const segmentTransform = {
      transform: `rotateX(${-angle * i}deg) translateZ(${radius}px)`,
      height: segmentHeight,
      top: `calc(50% - ${segmentHeight / 2}px)`,
    };

    return (
      <div
        className="segment w-full absolute flex items-center justify-center text-[8.5rem] select-none text-[#FAF9F6] drop-shadow-xl"
        style={segmentTransform}
        key={digit.toString()}
      >
        {digit}
      </div>
    );
  });

  // Create wheel
  const wheelTransform = {
    transformOrigin: "center",
    transform: `rotateX(${angle * digit}deg)`,
  };

  return (
    <div className="wheel w-[5rem]" style={wheelTransform}>
      {segments}
    </div>
  );
}

export default function Counter({ startingValue = 0 }) {
  // Initalize digits if a starting value was given
  const digits = [0, 0, 0, 0];
  if (startingValue) {
    const str = String(startingValue);
    const len = str.length;
    for (let i = 0; i < len; i++) {
      digits[i + (digits.length - len)] = Number(str[i]);
    }
  }

  // Separate useStates for each digit because each wheel needs to move independently (resetCount)
  const [thousands, setThousands] = useState(digits[0]);
  const [hundreds, setHundreds] = useState(digits[1]);
  const [tens, setTens] = useState(digits[2]);
  const [ones, setOnes] = useState(digits[3]);

  // Increment function
  const incrementCount = (event: MouseEvent) => {
    if (event.button == 0) {
      setOnes(ones + 1);
      if ((ones + 1) % 10 == 0) {
        // + 1 because useState() is always 1 behind for some reason
        setTens(tens + 1);
        if ((tens + 1) % 10 == 0) {
          setHundreds(hundreds + 1);
          if ((hundreds + 1) % 10 == 0) {
            setThousands(thousands + 1);
          }
        }
      }
    }
  };

  // Reset function
  const resetCount = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      const digits = [hundreds, tens, ones];
      const setDigits = [setHundreds, setTens, setOnes];

      // Check each digit if it is equal to the thousand's digit
      digits.map((digit, i) => {
        if (digit % 10 == thousands % 10) {
          // get last digit
          setDigits[i](digit + 1);
        }
      });

      // Increment each digit
      setThousands(thousands + 1);
    }
  };

  return (
    <div
      className="h-full flex items-center justify-center bg-stone-300"
      onMouseDown={incrementCount}
      onWheel={resetCount}
    >
      <div className="flex frame">
        <Wheel digit={thousands} />
        <Wheel digit={hundreds} />
        <Wheel digit={tens} />
        <Wheel digit={ones} />
      </div>
      {/* <div className='frame absolute left-1/2 -translate-x-1/2 flex w-[320px] text-[8.5rem] text-transparent tracking-[-4px]'>
          {thousands%10}{hundreds%10}{tens%10}{ones%10}
        </div> */}
    </div>
  );
}
