import { SearchResponse } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/search
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.body.url;
  const response = await axios.get<SearchResponse>(
    url + `&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );

  return res.status(200).json(response.data);
};
