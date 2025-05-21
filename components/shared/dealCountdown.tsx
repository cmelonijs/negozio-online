"use client";

import React, { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (finalDate: Date): TimeLeft => {
  //differencew -milliseconds betwn final date and current time
  const difference = finalDate.getTime() - new Date().getTime();

  const timeLeft: TimeLeft = {
    //1000milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //%24 -t get the remainder of the division, the hours left that dont complete a full day since days r displayed up top, here r remaining hours <24
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //%60 -t get the remainder of the division, the minutes left that dont complete a full hour since hours r displayed up top, here r remaining minutes <60
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    //%60 -t get the remainder of the division, the seconds left that dont complete a full minute since minutes r displayed up top, here r remaining seconds <60
    seconds: Math.floor((difference / 1000) % 60),
  };

  return timeLeft;
};

export const CountdownTimer = ({ finalDate }: { finalDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(finalDate)
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(finalDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [finalDate]);
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex gap-4 text-center text-lg md:text-2xl font-semibold">
      <div>
        <div>{days}</div>
        <div className="text-sm">Days</div>
      </div>
      <div>
        <div>{hours}</div>
        <div className="text-sm">Hours</div>
      </div>
      <div>
        <div>{minutes}</div>
        <div className="text-sm">Minutes</div>
      </div>
      <div>
        <div>{seconds}</div>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
};
