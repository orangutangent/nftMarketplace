import React from "react";

interface XIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}
export const XIcon = ({
  className,
  width = "6",
  height = "6",
  color = "F2F2F2",
}: XIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.904029 0.904029C1.02607 0.78199 1.22393 0.78199 1.34597 0.904029L3 2.55806L4.65403 0.904029C4.77607 0.78199 4.97393 0.78199 5.09597 0.904029C5.21801 1.02607 5.21801 1.22393 5.09597 1.34597L3.44194 3L5.09597 4.65403C5.21801 4.77607 5.21801 4.97393 5.09597 5.09597C4.97393 5.21801 4.77607 5.21801 4.65403 5.09597L3 3.44194L1.34597 5.09597C1.22393 5.21801 1.02607 5.21801 0.904029 5.09597C0.78199 4.97393 0.78199 4.77607 0.904029 4.65403L2.55806 3L0.904029 1.34597C0.78199 1.22393 0.78199 1.02607 0.904029 0.904029Z"
        fill={color}
      />
    </svg>
  );
};
