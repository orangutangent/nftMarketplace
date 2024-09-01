import React from "react";

interface RetryIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export function RetryIcon({
  width = "17",
  height = "16",
  color = "#A4A4A4",
  ...props
}: RetryIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 3C5.73858 3 3.5 5.23858 3.5 8C3.5 10.7614 5.73858 13 8.5 13C11.2614 13 13.5 10.7614 13.5 8C13.5 7.25457 13.3372 6.54853 13.0457 5.91434C12.9304 5.66343 13.0403 5.36654 13.2912 5.25121C13.5421 5.13588 13.839 5.24579 13.9543 5.49669C14.3048 6.25923 14.5 7.1075 14.5 8C14.5 11.3137 11.8137 14 8.5 14C5.18629 14 2.5 11.3137 2.5 8C2.5 4.68629 5.18629 2 8.5 2V3Z"
        fill={color}
      />
      <path
        d="M8.5 4.46624V0.533761C8.5 0.321802 8.74721 0.206013 8.91005 0.341706L11.2695 2.30795C11.3895 2.40789 11.3895 2.59211 11.2695 2.69206L8.91005 4.6583C8.74721 4.79399 8.5 4.6782 8.5 4.46624Z"
        fill={color}
      />
    </svg>
  );
}
