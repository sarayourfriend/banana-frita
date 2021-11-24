import type { VersionedBookmark } from "../types";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
	results: VersionedBookmark[];
	onSelect: (bookmark: VersionedBookmark) => void;
}

export const SearchResults = ({ results, onSelect }: SearchResultsProps) => {
	if (!results.length) {
		return null;
	}

	return (
		<ul className={styles.container}>
			{results.map((result) => (
				<li
					key={result.id}
					role="button"
					onClick={() => onSelect(result)}
				>
					<strong>{result.versions[0].title}</strong> —{" "}
					{result.categories
						.map((category) => category.name)
						.join(", ")}
				</li>
			))}
		</ul>
	);
};
