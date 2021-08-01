import type { GetServerSideProps } from "next";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import type { Category } from "@prisma/client";
import { prisma } from "../database/client";

interface CategoriesWithCounts extends Category {
	_count: {
		bookmarks: number;
	} | null;
}

interface HomeProps {
	categories: CategoriesWithCounts[];
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
	return (
		<div>
			<Head>
				<title>Banana Frita</title>
				<meta name="description" content="Mata fome!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="">
				<ul>
					{categories.map((category) => (
						<li key={category.id}>
							{category.name}: {category._count?.bookmarks || 0}
						</li>
					))}
				</ul>
			</div>

			<main>
				<form
					method="GET"
					action="/api/bookmark"
					className={styles.form}
				>
					<label>
						URL
						<input type="url" name="url" />
					</label>
					<label>
						Categories (comma separated)
						<input type="text" name="categories" />
					</label>
					<button type="submit">submit</button>
				</form>
			</main>
		</div>
	);
}
