import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ products: [{ name: 'item' }] });
  } else if (req.method === 'POST') {
    // 建立產品資料
  } else if (req.method === 'DELETE') {
    // 刪除產品資料
  }
}
