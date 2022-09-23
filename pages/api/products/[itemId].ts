import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req:NextApiRequest, res: NextApiResponse) {
	const { itemId } = req.query;
	res.status(200).json({ productId: itemId });
}