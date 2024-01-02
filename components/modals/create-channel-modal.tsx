"use client";

import { Fragment, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Hash, Volume2, X } from "lucide-react";
import { LockIcon } from "@/assets/Svgs";
import { ChannelType } from "@prisma/client";

interface CHANNEL_TYPE {
  channel: ChannelType;
  description: string;
  icon: React.ReactNode;
}

const CHANNELS: CHANNEL_TYPE[] = [
  {
    channel: "TEXT",
    description: "Send messages, images, GIFs, emoji, opinions, and puns",
    icon: <Hash className="text-[#b4b4b7] ml-4 mr-3" />,
  },
  {
    channel: "AUDIO",
    description: "Hang out together with voice, video, and screen share",
    icon: <Volume2 className="text-[#b4b4b7] ml-4 mr-3" />,
  },
];

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required!",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general",
    }),
  privateChannel: z.boolean(),
});

export const CreateChannelModal = () => {
  const { type, isOpen, onClose } = useModal();
  const router = useRouter();
  const params = useParams();

  const [channelType, setChannelType] = useState<ChannelType>("TEXT");

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      privateChannel: false,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      });
      await axios.post(url, {
        name: values.name,
        type: channelType.toUpperCase(),
      });

      onClose();
      form.reset();
      router.refresh();
      // window.location.reload();
    } catch (err) {
      console.log("Axiox- ", err);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onChannelPress = (channelType: ChannelType) => {
    setChannelType(channelType === "TEXT" ? "TEXT" : "AUDIO");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        cIcon={() => <X className="h-6 w-6 text-[#b5bac1] " />}
        className="bg-[#313338] text-black p-0 overflow-hidden outline-none"
      >
        <DialogHeader className="pt-3 text-left px-4">
          <DialogTitle className="text-xl font-normal text-white">
            {"Create Channel"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 text-[#b5bac1] text-sm font-bold">
          {"CHANNEL TYPE"}
        </div>
        <div className="px-4 text-xs font-bold text-[#b5bac1] mb-2 space-y-3">
          {CHANNELS.map(({ channel, description, icon }, index) => (
            <ChannelTypeComp
              icon={icon}
              channel={channel}
              onPress={onChannelPress}
              description={description}
              key={`${channel}_${index}`}
              active={channelType == channel}
            />
          ))}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase  text-sm font-bold text-zinc-500 dark:text-[#dbdee1]">
                      {"channel name"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center rounded-sm">
                        {channelType === "TEXT" ? (
                          <Hash className="absolute text-[#b4b4b7] h-5 w-5 ml-2" />
                        ) : (
                          <Volume2 className="absolute text-[#b4b4b7] h-5 w-5 ml-2" />
                        )}
                        <Input
                          disabled={isLoading}
                          className="bg-[#1e1f22] pl-8 border-0 focus-visible:ring-0 rounded-none text-[#a1a3a6] focus-visible:ring-offset-0"
                          placeholder="new-channel"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormControl>
                      <Fragment>
                        <div className="flex items-center pb-2 pt-4">
                          <div className="h-5 w-4 text-[#a5a6a9] mr-2">
                            <LockIcon />
                          </div>
                          <div className="text-[#acadb0] font-bold flex-1">
                            {"Private Channel"}
                          </div>
                          <Switch
                            color="red"
                            //@ts-ignore
                            checked={false}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                        <div className="text-[#b5bac1] text-sm">
                          {
                            "Only selected members and roles will be able to view this channel."
                          }
                        </div>
                      </Fragment>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-[#2b2d31] px-6 py-4">
              <button
                onClick={onClose}
                className="text-white text-sm mr-5 hover:underline hover:underline-offset-1"
              >
                {"Cancel"}
              </button>
              <Button variant={"primary"} disabled={!form.watch("name")}>
                {"Create Channel"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const ChannelTypeComp = ({
  icon,
  onPress,
  active = false,
  channel = "TEXT",
  description = "",
}: {
  active: boolean;
  description: string;
  channel: ChannelType;
  icon: React.ReactNode;
  onPress: (channel: ChannelType) => void;
}) => {
  return (
    <div
      onClick={() => onPress(channel)}
      className={cn(
        "bg-[#26282b] h-16 items-center flex w-full rounded hover:bg-[#393c41]",
        active && "bg-[#43444b]"
      )}
    >
      {icon}
      <div className="flex-1">
        <div className="text-[#d6d9dc] text-[15px] pb-2">{channel}</div>
        <div className="text-[#9b9fa5] text-xs">{description}</div>
      </div>
      <div className="h-5 w-5 mr-4 items-center justify-center flex rounded-full border-2 border-[#ffffff] ">
        {active && <div className="bg-[#ffffff] h-3 w-3 rounded-full" />}
      </div>
    </div>
  );
};
