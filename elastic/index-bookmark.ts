import type { VersionedBookmark } from "../types";
import { client } from "./client";

export async function indexBookmark(bookmark: VersionedBookmark) {
	await client.index({
		index: "bookmarks",
		body: {
			url: bookmark.url,
			categories: bookmark.categories.map((category) => ({
				name: category.name,
			})),
			versions: bookmark.versions.map((version) => ({
				content: version.content,
				textContent: version.textContent,
				authorInfo: version.authorInfo,
				title: version.title,
				siteName: version.siteName,
			})),
		},
	});
}

export async function indexBookmarks(bookmarks: VersionedBookmark[]) {
	if (!(await client.indices.exists({ index: "bookmarks" }))) {
		await client.indices.create({ index: "bookmarks" });
	}
	await Promise.all(bookmarks.map(indexBookmark));

	return client.indices.refresh({ index: "bookmarks" });
}
