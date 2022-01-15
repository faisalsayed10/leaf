import { BASE_URL, GENRES } from "@lib/constants";
import { getRandom } from "@util/helpers";
import { Item, SearchResponse } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { shuffle } from "underscore";

// GET /api/feed - Get the user's feed
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const randomGenres = getRandom(GENRES, 3);
	const data: Item[] = [];

	for (const genre of randomGenres) {
		const url = `${BASE_URL}/volumes?q=subject:${genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=20`;
		const response = await axios.get<SearchResponse>(url);
		if (response.data.items && response.data.items.length > 0) {
			data.push(...response.data.items);
		}
	}

	return res.status(200).json(shuffle(data));
};
