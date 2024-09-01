import React from "react";

interface FileIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export function FileIcon({
  width = "12",
  height = "16",
  color = "white",
  ...props
}: FileIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 0H7.5V1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H10C10.5523 15 11 14.5523 11 14V4.5H12V14C12 15.1046 11.1046 16 10 16H2C0.895431 16 0 15.1046 0 14V2C0 0.89543 0.895431 0 2 0Z"
        fill={color}
      />
      <path d="M7.5 3V0L12 4.5H9C8.17157 4.5 7.5 3.82843 7.5 3Z" fill={color} />
    </svg>
  );
}
