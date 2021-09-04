import { ListType } from ".prisma/client";
import prisma from "@lib/prisma";
import { ImageLinks } from "@util/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

interface Body {
	listId?: string;
	listType?: ListType;
	gbookId: string;
	title: string;
	authors: string[];
	publishedDate: string;
	previewLink: string;
	imageLinks: ImageLinks;
}

// POST /api/list/remove - Remove book from a list
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	const data = req.body as Body;
	if (!session) return res.status(401).json({ message: "Unauthorized" });

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	const list = await prisma.list.findFirst({
		where: {
			...(data.listId && { id: data.listId }),
			...(!data.listId && data.listType ? { type: data.listType } : {}),
			authorId: user.id,
		},
	});

	if (!list) return res.status(404).json({ message: "List not found" });

	try {
		const updatedList = await prisma.list.update({
			where: { id: list.id },
			data: {
				books: { disconnect: { gbookId: data.gbookId } },
			},
			include: { books: true },
		});

		return res.status(200).json(updatedList);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err.message });
	}
};
