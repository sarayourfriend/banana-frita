import { PrismaClient, Bookmark } from "@prisma/client";

export async function findBookmarks(
	id?: string,
	search?: string
): Promise<Bookmark | Bookmark[] | null> {
	const prisma = new PrismaClient();
	if (typeof id === "string") {
		return prisma.bookmark.findFirst({
			where: { id: parseInt(id, 10) },
		});
	}

	if (!search) {
		return null;
	}

	const query = { contains: search };

	return prisma.bookmark.findMany({
		where: {
			OR: [
				{
					url: query,
				},
				{
					title: query,
				},
				{
					content: query,
				},
				{
					authorInfo: query,
				},
				{
					siteName: query,
				},
			],
		},
	});
}
