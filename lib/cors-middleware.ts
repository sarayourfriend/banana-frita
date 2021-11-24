import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

function initMiddleware(middleware: ReturnType<typeof Cors>) {
	return <TResponse extends NextApiResponse<any>>(
		req: NextApiRequest,
		res: TResponse
	) =>
		new Promise((resolve, reject) => {
			middleware(req, res, (result) => {
				if (result instanceof Error) {
					return reject(result);
				}
				return resolve(result);
			});
		});
}

export const cors = initMiddleware(
	Cors({
		origin: "*",
	})
);
