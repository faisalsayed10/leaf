import { BASE_URL } from "@lib/constants";
import { SearchItem } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/genre/[genre]
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const genre = req.query.genre;
  const { data } = await axios.get<SearchItem>(
    `${BASE_URL}/volumes?q=subject:${genre}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=40`
  );

  return res.status(200).json(data);
};
