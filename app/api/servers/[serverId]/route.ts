import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
  params: { serverId: string };
};

export async function PATCH(req: Request, { params }: Params) {
  const { name, imageUrl } = await req.json();
  const profile = await currentProfile();
  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
