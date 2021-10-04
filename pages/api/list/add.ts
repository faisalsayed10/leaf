import { ListType } from ".prisma/client";
import prisma from "@lib/prisma";
import { toCapitalizedWords } from "@util/helpers";
import { ImageLinks } from "@util/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

interface Body {
	listId?: string;
	listType?: ListType;
	gbookId: string;
	title: string;
	description?: string;
	authors: string[];
	publishedDate: string;
	previewLink: string;
	imageLinks: ImageLinks;
}

// POST /api/list/add - Add book to a list
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	const data = req.body as Body;
	if (!session) return res.status(401).json({ message: "Unauthorized" });

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	let list = await prisma.list.findFirst({
		where: {
			...(data.listId && { id: data.listId }),
			...(!data.listId && data.listType ? { type: data.listType } : {}),
			authorId: user.id
		}
	});

	if (!list && data?.listType && data.listType !== "normal") {
		list = await prisma.list.create({
			data: {
				type: data.listType,
				authorId: user.id,
				name: toCapitalizedWords(data.listType)
			}
		});
	}

	if (!list) return res.status(404).json({ message: "List not found" });

	try {
		const updatedList = await prisma.list.update({
			where: { id: list.id },
			data: {
				books: {
					connectOrCreate: {
						where: { gbookId: data.gbookId },
						create: {
							gbookId: data.gbookId,
							title: data.title,
							description: data.description,
							authors: data.authors,
							publishedDate: data.publishedDate,
							previewLink: data.previewLink,
							imageLinks: data.imageLinks
						}
					}
				}
			},
			include: { books: true }
		});

		return res.status(200).json(updatedList);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err.message });
	}
};
