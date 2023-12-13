"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ActionTooltipProps {
  lable: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
  lable,
  children,
  side,
  align,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider >
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="relative overflow-visible items-center flex"
        >
          <div className="h-0 w-0 border-solid border-t-[7px] border-b-[7px] border-r-[7px] border-r-[#0c0a09] border-t-transparent border-b-transparent absolute left-[-7px]  " />
          <p className="font-semibold text-sm capitalize max-w-[150px]">
            {lable?.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
