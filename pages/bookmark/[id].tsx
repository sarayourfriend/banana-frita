import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import type { Bookmark } from "@prisma/client";
import { Converter } from "showdown";
import { findBookmarks } from "../../api/find-bookmarks";

export function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const id = context.params?.id;
	const bookmark = await findBookmarks(id as string);
	if (bookmark === null || Array.isArray(bookmark)) {
		return { notFound: true };
	}

	return {
		props: {
			bookmark: {
				title: bookmark.title,
				content: new Converter().makeHtml(bookmark.content),
			},
		},
	};
}

export default function BookmarkView({ bookmark }: { bookmark: Bookmark }) {
	return (
		<div>
			<Head>
				<title>Banana Frita - {bookmark.title}</title>
			</Head>

			<main>
				<article>
					<header>
						<h1>{bookmark.title}</h1>
					</header>
					<div
						dangerouslySetInnerHTML={{ __html: bookmark.content }}
					/>
				</article>
			</main>
		</div>
	);
}
