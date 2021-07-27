import { PrismaClient, Bookmark } from "@prisma/client";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import showdown from "showdown";

export async function createBookmark(url: string): Promise<Bookmark | Error> {
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
	const converter = new showdown.Converter();
	const parsed = new Readability(dom.window.document).parse();
	if (!parsed) {
		return new Error("Could not parse the page");
	}

	const { byline, content, textContent, title, siteName } = parsed;
	const prisma = new PrismaClient();
	return prisma.bookmark.create({
		data: {
			authorInfo: byline,
			title,
			content,
			textContent,
			url,
			siteName,
		},
	});
}
