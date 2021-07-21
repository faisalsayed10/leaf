import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/client";

// GET /api/list/:id
// UPDATE /api/list/:id
// DELETE /api/list/:id
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const id = req.query.id as string;
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  try {
    switch (req.method) {
      case "GET":
        const list = await prisma.list.findFirst({
          where: { id, authorId: user.id },
        });
        return res.status(200).json(list);

      case "DELETE":
        await prisma.list.deleteMany({
          where: { id, authorId: user.id },
        });
        return res.status(200).json({ message: "List deleted successfully" });

      case "PUT":
        const { title, description } = req.body;

        const updatedList = await prisma.list.updateMany({
          where: { id, authorId: user.id },
          data: { title, description },
        });
        return res.status(400).json(updatedList);

      default:
        return res.status(405).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: "List not found" });
  }
};
