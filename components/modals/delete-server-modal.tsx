"use client";

import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteServerModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { server } = data;
  const router = useRouter();

  const formSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Server name is required!",
      })
      .superRefine((val, ctx) => {
        if (val !== server?.name || "") {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: server?.name.length || 0,
            type: "string",
            inclusive: true,
            message: "You didn't enter the server name correctly",
          });
        }
      }),
  });

  const isModalOpen = isOpen && type === "deleteServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  // const isStateLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push("/servers");
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
              Delete
              <span className="font-bold whitespace-nowrap">
                {" '" + server?.name + "' server"}
              </span>
            </p>
          </DialogTitle>
          <DialogDescription className="pt-2  bg-[#f0b132] rounded-md pl-3 pr-3 pb-3">
            <p className="text-left text-base text-white">
              Are you sure you want to delete
              <span className="font-bold">{" " + server?.name + " "}</span>
              server?. This action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase  text-sm font-bold text-zinc-500 dark:text-[#dbdee1]">
                      {"ENTER SERVER NAME"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center rounded-sm">
                        <Input
                          disabled={isLoading}
                          className="bg-[#1e1f22] border-0 rounded focus-visible:ring-0 text-white font-normal focus-visible:ring-offset-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-[#2b2d31] px-6 py-4">
              <button
                onClick={onClose}
                className="text-white text-sm mr-5 hover:underline hover:underline-offset-1 border-0 outline-none"
              >
                {"Cancel"}
              </button>
              <Button variant={"danger"} disabled={isLoading}>
                {"Delete Server"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
