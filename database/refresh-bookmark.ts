import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { VersionedBookmark } from "../types";
import { prisma } from "./client";

export async function refreshBookmark(
	id: string
): Promise<VersionedBookmark | Error> {
	const bookmark = await prisma.bookmark.findFirst({
		where: { id: parseInt(id, 10) },
	});

	if (bookmark === null) {
		return new Error(`Could not find Bookmark with id ${id}`);
	}

	let page: string;
	try {
		const response = await fetch(bookmark.url);
		if (response.status < 400) {
			page = await response.text();
		} else {
			return new Error("Could not fetch page");
		}
	} catch (e) {
		return new Error("Could not fetch page");
	}

	const dom = new JSDOM(page, { url: bookmark.url });
	const parsed = new Readability(dom.window.document).parse();
	if (!parsed) {
		return new Error("Could not parse the page");
	}

	const { byline, content, textContent, title, siteName } = parsed;

	return await prisma.bookmark.update({
		where: {
			id: parseInt(id, 10),
		},
		data: {
			versions: {
				create: {
					authorInfo: byline,
					title,
					content,
					textContent,
					siteName,
				},
			},
		},
		include: {
			versions: true,
			categories: true,
		},
	});
}
