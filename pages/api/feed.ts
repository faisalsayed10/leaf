import { BASE_URL, GENRES } from "@lib/constants";
import { getRandom } from "@util/helpers";
import { SearchItem, SearchResponse } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/feed
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const randomGenres = getRandom(GENRES, 5);
  const data: SearchItem[] = [];

  for (const genre of randomGenres) {
    const url = `${BASE_URL}/volumes?q=subject:${genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=10`;
    const response = await axios.get<SearchResponse>(url);
    data.push(...response.data.items);
  }

  return res.status(200).json(data);
};
