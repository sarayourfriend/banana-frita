import { client } from "./client";

export async function searchBookmark(query: string): Promise<string[]> {
	const { body } = await client.search({
		index: "bookmarks",
		body: {
			query: {
				multi_match: {
					query,
					fields: [
						"url",
						"description",
						"categories.name",
						"versions.textContent",
						"versions.content",
						"versions.authorInfo",
						"versions.title",
					],
				},
			},
		},
	});

	return body.hits.hits.map((hit: any) => hit._source.url) as string[];
}
