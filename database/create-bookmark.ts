import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import type { VersionedBookmark } from "../types";
import { prisma } from "./client";
import { indexBookmark } from "../elastic/index-bookmark";

export async function createBookmark(
	url: string,
	unparsedCategories?: string,
	description?: string
): Promise<VersionedBookmark | Error> {
	let page: string;
	try {
		const response = await fetch(url);
		if (response.status < 400) {
			page = await response.text();
		} else {
			return new Error("Could not fetch page");
		}
	} catch (e) {
		return new Error("Could not fetch page");
	}

	const dom = new JSDOM(page, { url });
	const parsed = new Readability(dom.window.document).parse();
	if (!parsed) {
		return new Error("Could not parse the page");
	}

	const { byline, content, textContent, title, siteName } = parsed;

	const categories =
		unparsedCategories?.split(",").map((name) => name.trim()) || [];
	const existingCategories = await prisma.category.findMany({
		where: { name: { in: categories } },
	});
	const bookmark = await prisma.bookmark.create({
		data: {
			url,
			description,
			versions: {
				create: {
					authorInfo: byline,
					title,
					content,
					textContent,
					siteName,
				},
			},
			categories: {
				connect: existingCategories.map((c) => ({ id: c.id })),
				create: categories.reduce(
					(cats, name) =>
						existingCategories.find((c) => c.name === name)
							? cats
							: [...cats, { name }],
					[] as { name: string }[]
				),
			},
		},
		include: {
			categories: true,
			versions: true,
		},
	});
	indexBookmark(bookmark);
	return bookmark;
}
