import { VersionedBookmark } from "../types";
import { searchBookmark } from "../elastic/search-bookmark";
import { prisma } from "./client";

export async function findBookmarks(
	id?: string,
	search?: string
): Promise<VersionedBookmark | VersionedBookmark[] | null> {
	if (typeof id === "string") {
		return prisma.bookmark.findFirst({
			where: { id: parseInt(id, 10) },
			include: { categories: true, versions: true },
		});
	}

	if (!search) {
		return null;
	}

	const urls = await searchBookmark(search);

	return prisma.bookmark.findMany({
		where: { url: { in: urls } },
		include: { versions: true, categories: true },
	});
}
