import { client } from "./client";

export async function clearBookmarks() {
	return client.indices.delete({ index: "bookmarks" });
}
