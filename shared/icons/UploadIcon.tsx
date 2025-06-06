import React from "react";

interface UploadIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

export function UploadIcon({
  width = "16",
  height = "16",
  color = "#A4A4A4",
  ...props
}: UploadIconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 9.90002C0.776142 9.90002 1 10.1239 1 10.4V12.9C1 13.4523 1.44772 13.9 2 13.9H14C14.5523 13.9 15 13.4523 15 12.9V10.4C15 10.1239 15.2239 9.90002 15.5 9.90002C15.7761 9.90002 16 10.1239 16 10.4V12.9C16 14.0046 15.1046 14.9 14 14.9H2C0.895431 14.9 0 14.0046 0 12.9V10.4C0 10.1239 0.223858 9.90002 0.5 9.90002Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.64645 1.14645C7.84171 0.951184 8.15829 0.951184 8.35355 1.14645L11.3536 4.14645C11.5488 4.34171 11.5488 4.65829 11.3536 4.85355C11.1583 5.04882 10.8417 5.04882 10.6464 4.85355L8.5 2.70711V11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5V2.70711L5.35355 4.85355C5.15829 5.04882 4.84171 5.04882 4.64645 4.85355C4.45118 4.65829 4.45118 4.34171 4.64645 4.14645L7.64645 1.14645Z"
        fill={color}
      />
    </svg>
  );
}
