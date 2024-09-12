import React from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

interface NFTItemSkeletonProps extends React.HTMLProps<HTMLDivElement> {}

export const NFTItemSkeleton = ({
  className,
  ...props
}: NFTItemSkeletonProps) => {
  return (
    <div
      style={{ width: "320px", height: "500px" }}
      className={cn(
        "flex flex-col justify-between gap-4 w-[300px] overflow-hidden p-4 border-border border-2 rounded-xl",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-2xl text-center">NAME</h3>
        <div className="flex flex-col items-center ">
          <Skeleton style={{ width: "240px", height: "220px" }} />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-center">1 MATIC</p>
        <Button variant="default" onClick={() => alert("Buy")}>
          Buy
        </Button>
      </div>
    </div>
  );
};
