import type { NextApiRequest, NextApiResponse } from "next";
import { clearBookmarks } from "../../../elastic/clear-bookmarks";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<true | string>
) {
	if (process.env.NODE_ENV !== "development") {
		return res.status(404).send("");
	}

	try {
		await clearBookmarks();
		return res.status(200).send(true);
	} catch (e) {
		return res.status(400).send(e.message);
	}
}
