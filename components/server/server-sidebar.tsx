import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  serverId: string;
};

const ServerSidebar = async ({ serverId }: Props) => {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const memebers = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return <div>ServerSidebar</div>;
};

export default ServerSidebar;
