import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/client";
import { VolumeInfo } from "@util/types";

// POST /api/list/:id/add (Add book to a list)
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const id = req.query.id as string;
  const book: VolumeInfo & { id: string } = req.body;
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const list = await prisma.list.findFirst({
    where: { id, authorId: user.id },
  });

  if (!list) return res.status(404).json({ message: "List not found" });

  try {
    const updatedList = await prisma.list.update({
      where: { id },
      data: {
        books: {
          connectOrCreate: {
            where: { gbookId: book.id },
            create: {
              gbookId: book.id,
              title: book.title,
              authors: book.authors,
              publishedDate: book.publishedDate,
              previewLink: book.previewLink,
              imageLinks: Object.values(book.imageLinks),
            },
          },
        },
      },
      include: { books: true },
    });

    return res.status(200).json(updatedList);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};
