import { Book, ListType } from "@prisma/client";
import prisma from "@lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

interface Body {
	name: string;
	description: string;
	type: ListType;
	book: Omit<Book, "id">;
}

// GET /api/list - Get a list
// POST /api/list - Create a new list
// UPDATE /api/list - Update the name/description of a list
// DELETE /api/list - Delete a list
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) return res.status(401).json({ message: "Unauthorized" });
	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	try {
		if (req.method === "GET") {
			const { id, type } = req.query as { id?: string; type?: ListType };
			const list = await prisma.list.findFirst({
				where: {
					...(id && { id }),
					...(!id && type ? { type } : {}),
					authorId: user.id
				},
				include: { books: true }
			});

			if (!list) return res.status(404).json({ message: "List not found" });
			return res.status(200).json(list);
		} else if (req.method === "POST") {
			const { name, description, type, book } = req.body as Body;
			if (!name) return res.status(400).json({ message: "Title is required." });

			const user = await prisma.user.findUnique({
				where: { email: session.user.email }
			});

			const list = await prisma.list.create({
				data: {
					name,
					description: description || "",
					type: type || "normal",
					author: {
						connect: {
							id: user.id
						}
					},
					books: book && {
						connectOrCreate: {
							where: { gbookId: book.gbookId },
							create: {
								gbookId: book.gbookId,
								title: book.title,
								authors: book.authors,
								publishedDate: book.publishedDate,
								previewLink: book.previewLink,
								imageLinks: book.imageLinks
							}
						}
					}
				}
			});

			return res.status(200).json(list);
		} else if (req.method === "PUT") {
			const { id, type, name, description } = req.body;

			const updatedList = await prisma.list.updateMany({
				where: {
					...(id && { id }),
					...(!id && type ? { type } : {}),
					authorId: user.id
				},
				data: { name, description }
			});
			return res.status(200).json(updatedList);
		} else if (req.method === "DELETE") {
			const { id, type } = req.query as { id?: string; type?: ListType };

			await prisma.list.deleteMany({
				where: {
					...(id && { id }),
					...(!id && type ? { type } : {}),
					authorId: user.id
				}
			});
			return res.status(200).json({ message: "List deleted" });
		} else return res.status(405).end();
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err.message });
	}
};
