import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { Converter } from "showdown";
import { findBookmarks } from "../../database/find-bookmarks";
import type { VersionedBookmark } from "../../types";
import styles from "../../styles/Bookmark.module.css";

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
			bookmark: bookmark,
		},
	};
}

export default function BookmarkView({
	bookmark,
}: {
	bookmark: VersionedBookmark;
}) {
	return (
		<div>
			<Head>
				<title>Banana Frita - {bookmark.versions[0].title}</title>
			</Head>

			<main>
				<article>
					<header>
						<a href={bookmark.url}>
							<h1>{bookmark.versions[0].title}</h1>
						</a>
					</header>
					<form
						method="POST"
						action={`/api/bookmark/${bookmark.id}/versions`}
					>
						<button type="submit">Get latest version</button>
					</form>
					<div className={styles.versions}>
						{bookmark.versions.map((version) => (
							<Link
								key={version.id}
								href={`/bookmark/${bookmark.id}/${version.id}`}
							>
								<a>
									Version {version.createdAt.toDateString()}
								</a>
							</Link>
						))}
					</div>
					<div
						dangerouslySetInnerHTML={{
							__html: new Converter().makeHtml(
								bookmark.versions[0].content
							),
						}}
					/>
				</article>
			</main>
		</div>
	);
}
