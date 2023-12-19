"use client";

import React, { Fragment, useState, useRef } from "react";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { cn } from "@/lib/utils";

import { ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ListItems } from "./helper";
import { useModal } from "@/hooks/use-modal-store";
import { MenuItemProps, MenuItemPropsEnum } from "./helper";
interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles | any;
  role?: MemberRole | any;
}

function ServerHeader({ server, role }: ServerHeaderProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const onMenuItemPress = (item: string) => {
    switch (item) {
      case MenuItemPropsEnum.Invite_People:
        onOpen("invite", { server });
        return;
      case MenuItemPropsEnum.Edit_Server_Profile:
        onOpen("editServer", { server });
        return;
      case MenuItemPropsEnum.Manage_Members:
        onOpen("members", { server });
        return;
    }
  };

  return (
    <DropdownMenu onOpenChange={(flag) => setIsDropDownOpen(flag)}>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          <div className="flex flex-1">{server.name}</div>
          <div className="relative border flex items-center justify-end">
            <ChevronDown
              className={cn(
                `absolute h-5 w-5 ml-auto duration-200`,
                isDropDownOpen ? "rotate-[270deg] opacity-0" : ""
              )}
            />
            <X
              className={cn(
                `absolute h-5 w-5 ml-auto duration-200`,
                !isDropDownOpen ? "-rotate-[270deg] opacity-0" : ""
              )}
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {ListItems.filter((list) => list.role?.includes?.(role))?.map(
          ({ title, styles, icon, key, hasSeparator, hasTopSeparator }) => {
            const Icon = icon;
            return (
              <Fragment>
                {hasTopSeparator && <Separator className="w-[192px] ml-3" />}
                <DropdownMenuItem
                  key={key}
                  className={styles}
                  onClick={() => onMenuItemPress(key)}
                >
                  <div className="flex-1">{title}</div>
                  <Icon />
                </DropdownMenuItem>
                {hasSeparator && <Separator className="w-[192px] ml-3 " />}
              </Fragment>
            );
          }
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ServerHeader;
