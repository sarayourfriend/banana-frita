import Head from "next/head";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Banana Frita</title>
				<meta name="description" content="Mata fome!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<form method="GET" action="/api/bookmark">
					<label>
						URL
						<input type="url" name="url" />
					</label>
				</form>
			</main>
		</div>
	);
}
