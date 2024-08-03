import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

type Params = {
  params: { serverId: string };
};
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { serverId } = params;
    if (!serverId) {
      return new NextResponse("Invalid server ID", { status: 400 });
    }
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        inviteCode: uuid(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
