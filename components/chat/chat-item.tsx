import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "@/components/user-avatar";
import ActionTooltip from "@/components/action-tooltip";
import { ShieldAlert, ShieldCheck } from "lucide-react";

type Props = {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
};

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: Props) => {
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar
            src={member?.profile?.imageUrl}
            className="h-10 w-10 md:h-10 md:w-10"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {member?.profile?.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
