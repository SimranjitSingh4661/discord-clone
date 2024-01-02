"use client";

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

export const LeaveServerModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { server } = data;
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveServer";

  const onLeaveServerPress = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
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
            <p>
              Leave
              <span className="font-bold whitespace-nowrap">
                {" '" + server?.name + "'"}
              </span>
            </p>
          </DialogTitle>
          <DialogDescription className="text-left text-base text-[#babdc1] pt-2">
            <p>
              Are you sure you want to leave
              <span className="font-bold whitespace-nowrap">
                {" " + server?.name + "? "}
              </span>
              {` You won't be able to rejoin this server unless you are re-invited.`}
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
          <Button
            variant={"danger"}
            disabled={isLoading}
            onClick={onLeaveServerPress}
          >
            {"Leave Server"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
