import { BASE_URL } from "@lib/constants";
import { SearchResponse } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/search/url - Search books by url (google url)
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const url = req.query.url;
	const response = await axios.get<SearchResponse>(
		BASE_URL + "/volumes?" + url + `&maxResults=40&key=${process.env.GOOGLE_BOOKS_API_KEY}`
	);

	return res.status(200).json(response.data);
};
