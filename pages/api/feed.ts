import { BASE_URL, GENRES } from "@lib/constants";
import { getRandom } from "@util/helpers";
import { FeedData, SearchResponse } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// GET /api/feed
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const randomGenres = getRandom(GENRES, 5);
  const data: FeedData[] = [];

  for (const genre of randomGenres) {
    const url = `${BASE_URL}/volumes?q=subject:${genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=5`;
    const response = await axios.get<SearchResponse>(url);
    data.push({ name: genre, value: response.data });
  }

  return res.status(200).json(data);
};
