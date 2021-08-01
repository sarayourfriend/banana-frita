import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { Converter } from "showdown";
import { findBookmarks } from "../../../database/find-bookmarks";
import type { VersionedBookmark } from "../../../types";
import type { Version } from "@prisma/client";

import styles from "../../../styles/Bookmark.module.css";

export function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const id = context.params?.id;
	const versionId = parseInt(context.params?.versionId as string, 10);
	if (Number.isNaN(versionId)) {
		return { notFound: true };
	}

	const bookmark = await findBookmarks(id as string);
	if (bookmark === null || Array.isArray(bookmark)) {
		return { notFound: true };
	}

	const version = bookmark.versions.find((v) => v.id === versionId);
	if (!version) {
		return { notFound: true };
	}

	return {
		props: {
			bookmark,
			version,
		},
	};
}

export default function BookmarkView({
	bookmark,
	version,
}: {
	bookmark: VersionedBookmark;
	version: Version;
}) {
	return (
		<div>
			<Head>
				<title>Banana Frita - {version.title}</title>
			</Head>

			<main>
				<article>
					<header>
						<a href={bookmark.url}>
							<h1>{version.title}</h1>
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
							__html: new Converter().makeHtml(version.content),
						}}
					/>
				</article>
			</main>
		</div>
	);
}
