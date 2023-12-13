"use client";

import React, { Fragment } from "react";
import { Plus, ArrowDownToLine } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { DiscordIcon, ExploreIcon } from "@/assets/Svgs";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";

interface SidebarType {
  type: "top" | "bottom";
}

function NavigationAction({ type }: SidebarType) {
  const { onOpen } = useModal();

  if (type === "top") {
    return (
      <div>
        <ActionTooltip side="right" align="center" lable="Direct Messages">
          <button className="group flex items-center relative">
            <div className=" absolute h-0 w-[4px] bg-white rounded-tr-full rounded-br-full group-hover:block duration-100 group-hover:h-6" />
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-[#5865f2]">
              <DiscordIcon />
            </div>
          </button>
        </ActionTooltip>
      </div>
    );
  }

  return (
    <Fragment>
      <div>
        <ActionTooltip side="right" align="center" lable="Add a server">
          <button
            onClick={() => onOpen("createServer")}
            className="group flex items-center relative"
          >
            {/* <div className=" absolute h-0 w-[4px] bg-white rounded-tr-full rounded-br-full group-hover:block duration-100 group-hover:h-6" /> */}
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <Plus
                size={25}
                className="group-hover:text-white transition text-emerald-500"
              />
            </div>
          </button>
        </ActionTooltip>
      </div>
      <div>
        <ActionTooltip
          side="right"
          align="center"
          lable="Explore Discoverable Servers"
        >
          <button className="group flex items-center relative">
            <div className=" absolute h-0 w-[4px] bg-white rounded-tr-full rounded-br-full group-hover:block duration-100 group-hover:h-6" />
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <ExploreIcon className="text-emerald-500 group-hover:text-white h-[30px] w-[30px]" />
            </div>
          </button>
        </ActionTooltip>
      </div>
      <Separator className="h-[2px] bg-zinc-700 rounded-md w-10 mx-auto" />
      <div>
        <ActionTooltip side="right" align="center" lable="Download Apps">
          <button className="group flex items-center relative">
            <div className=" absolute h-0 w-[4px] bg-white rounded-tr-full rounded-br-full group-hover:block duration-100 group-hover:h-6" />
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <ArrowDownToLine
                size={25}
                className="group-hover:text-white transition text-emerald-500"
              />
            </div>
          </button>
        </ActionTooltip>
      </div>
    </Fragment>
  );
}

export default NavigationAction;
