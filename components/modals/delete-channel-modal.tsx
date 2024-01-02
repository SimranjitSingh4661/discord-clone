"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteChannelModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { server, channel } = data;
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log("Leave", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        cIcon={() => <> </>}
        className="bg-[#313338] text-black p-0 overflow-hidden outline-none"
      >
        <DialogHeader className="pt-3 text-left px-4 ">
          <DialogTitle className="text-xl font-semibold text-white whitespace-nowrap">
            <p className="mb-3">
              Delete Channel
              {/* <span className="font-bold whitespace-nowrap">
                {" '" + server?.name + "' server"}
              </span> */}
            </p>
          </DialogTitle>
          <DialogDescription className="pt-2 pr-3 pb-3">
            <p className="text-left text-base text-white">
              Are you sure you want to delete
              <span className="font-bold">{" " + channel?.name}</span>? This
              action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-[#2b2d31] px-6 py-4">
          <button
            onClick={onClose}
            className="text-white text-sm mr-5 hover:underline hover:underline-offset-1 border-0 outline-none"
          >
            {"Cancel"}
          </button>
          <Button onClick={onSubmit} variant={"danger"} disabled={isLoading}>
            {"Delete Channel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
