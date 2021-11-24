import styles from "./Categories.module.scss";
import type { CategoryWithCounts, VersionedBookmark } from "../types";

interface CategoriesProps {
	categories: CategoryWithCounts[];
	onResults: (bookmarksInCategory: VersionedBookmark[]) => void;
}

async function getResultsForCategory(
	category: string
): Promise<VersionedBookmark[]> {
	try {
		const response = await fetch(`/api/bookmark?category=${category}`);
		const bookmarks = await response.json();
		return bookmarks;
	} catch (e) {
		console.error(e);
		return [];
	}
}

export const Categories = ({ categories, onResults }: CategoriesProps) => (
	<div className={styles.container}>
		{categories.map((category, index) => (
			<div
				key={category.id}
				className={styles.category}
				data-last={index === categories.length - 1}
				role="button"
				onClick={() =>
					getResultsForCategory(category.name).then(onResults)
				}
			>
				{category.name}: {category._count?.bookmarks || 0}
			</div>
		))}
	</div>
);
