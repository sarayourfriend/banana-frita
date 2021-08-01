import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../styles/Layout.module.css";

export const Layout = ({ children }: { children: ReactNode }) => (
	<div className={styles.container}>
		<Link href="/">
			<a>
				<h1>Banana Frita</h1>
			</a>
		</Link>
		{children}
	</div>
);
