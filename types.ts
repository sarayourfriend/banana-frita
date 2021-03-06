import type { Bookmark, Version, Category } from "@prisma/client";

export interface VersionedBookmark extends Bookmark {
	versions: Version[];
	categories: Category[];
}

export interface CategoryWithCounts extends Category {
	_count: {
		bookmarks: number;
	} | null;
}
