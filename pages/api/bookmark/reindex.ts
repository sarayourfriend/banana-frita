import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { indexBookmarks } from "../../../elastic/index-bookmark";

function getAllBookmarks() {
	const client = new PrismaClient();
	return client.bookmark.findMany({
		include: {
			versions: true,
			categories: true,
		},
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<true | string>
) {
	try {
		const bookmarks = await getAllBookmarks();
		await indexBookmarks(bookmarks);
		return res.status(200).send(true);
	} catch (e) {
		return res.status(400).send(e.message);
	}
}
