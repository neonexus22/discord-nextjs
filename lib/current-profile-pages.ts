import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const currentProfilePages = (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) return null;

  return db.profile.findUnique({
    where: { userId },
  });
};
