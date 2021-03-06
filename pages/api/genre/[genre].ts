import { BASE_URL } from "@lib/constants";
import { Item } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/genre/:genre - Get books by genre
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const genre = req.query.genre;
	const { data } = await axios.get<Item>(
		`${BASE_URL}/volumes?q=subject:${genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=40`
	);

	return res.status(200).json(data);
};
