import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/client";

// POST /api/list
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required." });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    await prisma.list.create({
      data: {
        title,
        description: description || "",
        updatedAt: new Date().toDateString(),
        authorId: user.id,
      },
    });

    return res.status(200).json({ message: "List created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};
