import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/client";
import { ListType } from ".prisma/client";

// POST /api/list/remove - Remove book from a list
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	const { id, type } = req.query as { id?: string; type?: ListType };
	const gbookId: string = req.body.gbookId;
	if (!session) return res.status(401).json({ message: "Unauthorized" });

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	const list = await prisma.list.findFirst({
		where: {
			...(id && { id }),
			...(!id && type ? { type } : {}),
			authorId: user.id,
		},
	});

	if (!list) return res.status(404).json({ message: "List not found" });

	try {
		const updatedList = await prisma.list.update({
			where: { id },
			data: {
				books: { disconnect: { gbookId } },
			},
			include: { books: true },
		});

		return res.status(200).json(updatedList);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err.message });
	}
};
