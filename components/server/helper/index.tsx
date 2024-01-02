import { MemberRole } from "@prisma/client";
import {
  UserPlus,
  Sparkles,
  LayoutGrid,
  PlusCircle,
  FolderPlus,
  CalendarPlus,
  Bell,
  LucideShieldCheck,
  Pencil,
  DoorOpen,
  UsersIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const { ADMIN, GUEST, MODERATOR } = MemberRole;

export enum MenuItemPropsEnum {
  Server_Boost = "Server_Boost",
  Invite_People = "Invite_People",
  Create_Channel = "Create_Channel",
  Create_Category = "Create_Category",
  Create_Event = "Create_Event",
  App_Directory = "App_Directory",
  Manage_Members = "Manage_Members",
  Show_All_Channels = "Show_All_Channels",
  Notification_Settings = "Notification_Settings",
  Privacy_Settings = "Privacy_Settings",
  Edit_Server_Profile = "Edit_Server_Profile",
  Hide_Muted_Channels = "Hide_Muted_Channels",
  Leave_Server = "Leave_Server",
  Delete_Server = "Delete_Server",
}
export type MenuItemProps =
  | "Server_Boost"
  | "Invite_People"
  | "Create_Channel"
  | "Create_Category"
  | "Create_Event"
  | "App_Directory"
  | "Show_All_Channels"
  | "Notification_Settings"
  | "Privacy_Settings"
  | "Edit_Server_Profile"
  | "Hide_Muted_Channels"
  | "Leave_Server"
  | "Delete_Server";

export const ListItems = [
  {
    key: "Server_Boost",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Server Boost",
    hasSeparator: true,
    icon: () => <Sparkles className="h-4 w-4 ml-auto" />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    key: "Invite_People",
    styles:
      "text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer",
    title: "Invite People",
    hasSeparator: false,
    icon: () => <UserPlus className="h-4 w-4 ml-auto" />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    key: "Manage_Members",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Manage Members",
    hasSeparator: false,
    icon: () => <UsersIcon className="h-4 w-4 ml-auto" />,
    role: [ADMIN],
  },
  {
    key: "Create_Channel",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Create Channel",
    hasSeparator: false,
    icon: () => <PlusCircle className="h-4 w-4 ml-auto" />,
    role: [ADMIN],
  },
  {
    key: "Create_Category",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Create Category",
    hasSeparator: false,
    icon: () => <FolderPlus className="h-4 w-4 ml-auto" />,
    role: [ADMIN],
  },
  {
    key: "Create_Event",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Create Event",
    hasSeparator: false,
    icon: () => <CalendarPlus className="h-4 w-4 ml-auto" />,
    role: [ADMIN],
  },
  {
    key: "App_Directory",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "App Directory",
    hasSeparator: true,
    icon: () => <LayoutGrid className="h-4 w-4 ml-auto" />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    key: "Show_All_Channels",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Show All Channels",
    hasSeparator: false,
    icon: () => <Checkbox />,
    role: [GUEST, MODERATOR],
  },
  {
    key: "Notification_Settings",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Notification Settings",
    hasSeparator: false,
    icon: () => <Bell className="h-4 w-4 ml-auto" />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    key: "Privacy_Settings",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Privacy Settings",
    hasSeparator: true,
    icon: () => <LucideShieldCheck className="h-4 w-4 ml-auto" />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    key: "Edit_Server_Profile",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Edit Server Profile",
    hasSeparator: false,
    icon: () => <Pencil className="h-4 w-4 ml-auto" />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    key: "Hide_Muted_Channels",
    styles: "px-3 py-2 text-sm cursor-pointer",
    title: "Hide Muted Channels",
    hasSeparator: false,
    icon: () => <Checkbox />,
    role: [ADMIN, GUEST, MODERATOR],
  },
  {
    hasTopSeparator: true,
    key: "Leave_Server",
    styles: "text-red-500 px-3 py-2 text-sm cursor-pointer",
    title: "Leave Server",
    hasSeparator: false,
    icon: () => <DoorOpen className="h-4 w-4 ml-auto" />,
    role: [GUEST, MODERATOR],
  },
  {
    hasTopSeparator: true,
    key: "Delete_Server",
    styles: "text-red-500 px-3 py-2 text-sm cursor-pointer",
    title: "Delete Server",
    hasSeparator: false,
    icon: () => <DoorOpen className="h-4 w-4 ml-auto" />,
    role: [ADMIN],
  },
];
