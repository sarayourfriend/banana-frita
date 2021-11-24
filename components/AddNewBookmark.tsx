import type { FormEvent } from "react";
import type { VersionedBookmark } from "../types";
import styles from "./AddNewBookmark.module.scss";

interface AddNewBookmarkProps {
	onSave: (newBookmark: VersionedBookmark) => void;
}

export const AddNewBookmark = ({ onSave }: AddNewBookmarkProps) => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		const url = event.currentTarget.elements.namedItem("url");
		const categories = event.currentTarget.elements.namedItem("categories");
		const description =
			event.currentTarget.elements.namedItem("description");

		try {
			const response = await fetch("/api/bookmark", {
				method: "POST",
				body: JSON.stringify({ url, categories, description }),
			});
			const newBookmark = await response.json();
			onSave(newBookmark);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<label>
					Url{" "}
					<input type="url" name="url" required placeholder="Url" />
				</label>

				<label>
					Categories{" "}
					<input
						type="text"
						name="categories"
						placeholder="Categories (comma separated)"
					/>
				</label>

				<label>
					Description{" "}
					<textarea name="description" rows={3}></textarea>
				</label>

				<button type="submit">Save</button>
			</form>
		</div>
	);
};
