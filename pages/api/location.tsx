import { prisma } from '@/server/db/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name } = req.body;
    const location = await prisma.location.create({
      data: {
        name,
      },
    });
    res.status(201).json(location);
  }
}
