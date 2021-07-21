import { BASE_URL } from "@lib/constants";
import { Item } from "@util/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/book/id
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const { data } = await axios.get<Item>(
    `${BASE_URL}/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );

  return res.status(200).json(data);
};
