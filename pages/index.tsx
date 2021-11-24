import { useState } from "react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { prisma } from "../database/client";
import type { CategoryWithCounts, VersionedBookmark } from "../types";
import { Categories } from "../components/Categories";
import { Search } from "../components/Search";
import { SearchResults } from "../components/SearchResults";
import { Bookmark } from "../components/Bookmark";
import { AddNewBookmark } from "../components/AddNewBookmark";

interface HomeProps {
	categories: CategoryWithCounts[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	context
) => {
	const categories = await prisma.category.findMany({
		include: {
			_count: {
				select: {
					bookmarks: true,
				},
			},
		},
	});

	return {
		props: { categories },
	};
};

export default function Home({ categories }: HomeProps) {
	const [searchResults, setSearchResults] = useState(
		[] as VersionedBookmark[]
	);
	const [selectedResult, setSelectedResult] = useState(
		null as VersionedBookmark | null
	);

	return (
		<div className={styles.container}>
			<Head>
				<title>Banana Frita</title>
				<meta name="description" content="Mata fome!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Categories categories={categories} onResults={setSearchResults} />

			<main className={styles.main}>
				<Search onResults={setSearchResults} />

				{selectedResult ? (
					<Bookmark
						bookmark={selectedResult}
						onBack={() => setSelectedResult(null)}
					/>
				) : searchResults.length ? (
					<SearchResults
						results={searchResults}
						onSelect={setSelectedResult}
					/>
				) : (
					<AddNewBookmark onSave={setSelectedResult} />
				)}
			</main>
		</div>
	);
}
