"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { useOrigin } from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";

export const InviteServerModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const [isCopied, setIsCopied] = useState(false);

  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const isModalOpen = isOpen && type === "invite";

  const onCopyClick = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        cIcon={() => <X className="h-6 w-6 text-[#b5bac1] " />}
        className="bg-[#313338] text-black p-0 overflow-hidden outline-none"
      >
        <DialogHeader className="pt-3 text-left px-4 ">
          <DialogTitle className="text-base font-normal text-white whitespace-nowrap">
            <p>
              Invite friends to
              <span className="font-bold whitespace-nowrap">
                {" " + server?.name}
              </span>{" "}
              {"'s server"}
            </p>
          </DialogTitle>
          <DialogDescription className="text-left text-base text-zinc-500">
            {"# general"}
          </DialogDescription>
          <div className="relative items-center flex">
            <Input
              className=" bg-[#1e1f22] border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
              placeholder="Search for friends"
            />
            <Search className="absolute right-2" color="#b5bac1" size={20} />
          </div>
        </DialogHeader>
        <div className="border-t-2 px-4 h-200 border-[#1e1f22] flex-col space-y-3 flex pt-4 pb-4 border-b-2 w-full">
          {/* {[0, 1, 2].map(() => (
            <SearchItemRow />
          ))} */}
        </div>
        <div className="p-2 px-4 ">
          <Label className="uppercase text-sm font-bold text-[#abb0b7]">
            {"or, send a server invite link to a friend"}
          </Label>
          <div className="relative flex items-center mt-2 gap-x-2">
            <Input
              className="bg-[#1e1f22]  border-0 focus-visible:ring-0 text-[#a1a3a6] focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button
              onClick={onCopyClick}
              className={cn(
                "absolute rounded-sm w-20 right-1 h-8 text-[#f6f7fe] duration-200",
                isCopied
                  ? "bg-[#1a6334] hover:bg-[#1a6334]"
                  : "bg-[#5865f2] hover:bg-[#4853cd]"
              )}
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
          <p className=" text-[#f6f7fe] text-xs pt-3 pb-2">
            Your invite link expires in 7 days.
            <span className="text-[#117eb6] font-bold whitespace-nowrap">
              {" " + "Edit invite link."}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SearchItemRow = () => {
  return (
    <div className="flex items-center flex-1">
      <div className="flex items-center w-full">
        <div className="h-10 w-10 bg-slate-400 rounded-full" />
        <p className="text-[#f6f7fe] pl-4">{"Name"}</p>
      </div>
      <Button className=" text-[#f6f7fe] rounded-sm bg-transparent border-[1px] h-8 border-[#23a559] hover:bg-[#23a559]">
        {"Invite"}
      </Button>
    </div>
  );
};
