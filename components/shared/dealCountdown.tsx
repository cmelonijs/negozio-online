"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ViewProductsBtn from "./viewProductsBtn";

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
  <div className="w-full px-4 py-8">
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-6 text-center md:text-left max-w-xl">
        <h2 className="text-4xl font-bold">Deal ends in:</h2>
        <p className="text-base md:text-lg text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam,
          tenetur quibusdam? Facilis reiciendis ea, dolores vitae quas cum
          cumque quis veniam neque consequuntur repudiandae commodi labore amet
          ratione soluta accusamus?
        </p>

        <div className="flex justify-center md:justify-start gap-6 text-center text-2xl font-semibold">
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
            <ViewProductsBtn />
      </div>
      <Image
        src="/images/sample-products/p6-1.jpg"
          width={600}
        height={600}
        alt="Product Deal"
        className="w-full max-w-sm h-auto rounded-xl object-cover"
      />
    </div>
  </div>
);

}