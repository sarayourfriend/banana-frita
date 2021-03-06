// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Bookmark } from "@prisma/client";
import { createBookmark } from "../../database/create-bookmark";
import { findBookmarks } from "../../database/find-bookmarks";
import { cors } from "../../lib/cors-middleware";

async function handlePost(
	req: NextApiRequest,
	res: NextApiResponse<Bookmark | string>
) {
	const bookmarkOrError = await createBookmark(
		req.body.url,
		req.body.categories,
		req.body.description
	);
	if (bookmarkOrError instanceof Error) {
		return res.status(400).send(bookmarkOrError.message);
	}
	return res.status(200).send(bookmarkOrError);
}

async function handleGet(
	req: NextApiRequest,
	res: NextApiResponse<Bookmark | Bookmark[] | null>
) {
	const {
		id,
		search,
		url,
		categories,
		category,
		description,
	}: {
		id?: string;
		search?: string;
		url?: string;
		categories?: string;
		category?: string;
		description?: string;
	} = req.query;

	// Support "getting" a URL to create a new bookmark as a way of support bookmarklets
	if (typeof url === "string") {
		const bookmark = await createBookmark(url, categories, description);
		if (bookmark instanceof Error) {
			return res.status(400).send(null);
		}
		return res.redirect(`/bookmark/${bookmark.id}`);
	}

	const bookmarks = await findBookmarks(id, category, search);
	if (bookmarks === null) {
		return res.status(404).send(null);
	}
	return res.status(200).send(bookmarks);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Bookmark | Bookmark[] | string | null>
) {
	await cors(req, res);
	switch (req.method) {
		case "POST":
			return handlePost(req, res);
		case "GET":
			return handleGet(req, res);
		default:
			return res.status(404).send(null);
	}
}
