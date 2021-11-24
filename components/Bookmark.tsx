import { useState } from "react";
import type { VersionedBookmark } from "../types";
import { Converter } from "showdown";
import styles from "./Bookmark.module.scss";

interface BookmarkProps {
	bookmark: VersionedBookmark;
	onBack: () => void;
}

export const Bookmark = ({ bookmark, onBack }: BookmarkProps) => {
	const [version, setVersion] = useState(bookmark.versions[0]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<button type="button" onClick={onBack}>
					Back
				</button>

				<h1>{version.title}</h1>

				<div
					dangerouslySetInnerHTML={{
						__html: new Converter().makeHtml(
							bookmark.versions[0].content
						),
					}}
				/>
			</div>
		</div>
	);
};
