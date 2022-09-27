import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectToDatabase();

  const productCollections = client.db().collection('products');

  const products = await productCollections.find({}).toArray();

  res.status(200).send(products);
}
