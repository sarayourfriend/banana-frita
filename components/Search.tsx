import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Search.module.scss";
import { VisuallyHidden } from "reakit";
import { debounce } from "ts-debounce";

import type { VersionedBookmark } from "../types";

interface SearchProps {
	onResults: (bookmarks: VersionedBookmark[]) => void;
}

const searchQuery = async (query: string): Promise<VersionedBookmark[]> => {
	try {
		const response = await fetch(
			`/api/bookmark?search=${encodeURIComponent(query)}`
		);
		if (response.status === 404) {
			return [];
		}
		const results = response.json();
		return results;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const Search = ({ onResults }: SearchProps) => {
	const [query, setQuery] = useState("");

	const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		searchQuery(query).then(onResults);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<VisuallyHidden as="label" htmlFor="query">
					Search
				</VisuallyHidden>
				<input
					type="search"
					name="query"
					id="query"
					value={query}
					onChange={handleQuery}
					placeholder="Search"
				/>
			</form>
		</div>
	);
};
