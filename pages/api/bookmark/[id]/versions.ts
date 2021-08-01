import type { NextApiRequest, NextApiResponse } from "next";
import type { VersionedBookmark } from "../../../../types";
import { refreshBookmark } from "../../../../database/refresh-bookmark";

async function handlePost(
	req: NextApiRequest,
	res: NextApiResponse<VersionedBookmark | string>
) {
	const { id } = req.query;

	if (typeof id === "string") {
		const bookmark = await refreshBookmark(id);
		if (bookmark instanceof Error) {
			return res.status(400).send(bookmark.message);
		}
		return res.status(200).send(bookmark);
	}

	return res.status(400).send("Missing `id` query param");
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<VersionedBookmark | string | null>
) {
	switch (req.method) {
		case "POST":
			return handlePost(req, res);
		default:
			return res.status(404).send(null);
	}
}
