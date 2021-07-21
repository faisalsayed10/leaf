import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/client";

// POST /api/list
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const { title, description, book } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required." });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const list = await prisma.list.create({
      data: {
        title,
        description: description || "",
        author: {
          connect: {
            id: user.id,
          },
        },
        books: book
          ? {
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
            }
          : undefined,
      },
    });

    return res.status(200).json(list);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};
