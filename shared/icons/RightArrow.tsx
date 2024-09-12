import React from "react";

interface Props {
  className?: string;
  height?: string;
  width?: string;
}

const RightArrow = ({ className, height, width }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={4}
      stroke="currentColor"
      height={height || "20px"}
      width={width || "20px"}
      className={"w-full h-[20px] stroke-primary" + className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
};

export default RightArrow;
