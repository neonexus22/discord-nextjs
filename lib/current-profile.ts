import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = () => {
  const { userId } = auth();

  if (!userId) return null;

  return db.profile.findUnique({
    where: { userId },
  });
};
