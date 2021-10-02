import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/client";

// GET /api/lists - Get all lists of a user
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const lists = await prisma.list.findMany({
      where: { authorId: user.id, type: "normal" },
      include: { books: true },
    });

    return res.status(200).json(lists);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};
