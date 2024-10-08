import { useState, useEffect } from "react";

const nums = [1, 2, 3, 4, 5];

const Test = () => {
  const [num, setNum] = useState<number[]>([]);

  const amountToShow = () => {
    const width = window.innerWidth;

    let allowedNumbers;
    if (width < 640) {
      allowedNumbers = 1;
    } else if (width < 768) {
      allowedNumbers = 2;
    } else if (width < 1024) {
      allowedNumbers = 3;
    } else {
      allowedNumbers = 4;
    }

    setNum(nums.slice(0, allowedNumbers));
  };

  useEffect(() => {
    amountToShow(); // Set initial numbers to show
    window.addEventListener("resize", amountToShow); // Add resize listener

    return () => {
      window.removeEventListener("resize", amountToShow); // Cleanup listener
    };
  }, []); // Empty dependency array to run on mount

  return (
    <div>
      <h1>Numbers to Show:</h1>
      <ul>
        {num.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;