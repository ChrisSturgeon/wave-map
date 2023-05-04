import { prisma } from '@/server/db/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';

// Validation Schema
const locationSchema = z.object({
  name: z.string().min(3).max(20),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST METHOD
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({
        error: 'You must login to post a new location',
      });
      return;
    }

    const response = locationSchema.safeParse(req.body);

    if (!response.success) {
      const { errors } = response.error;

      return res.status(401).json({
        error: {
          message: 'Invalid request',
          errors,
        },
      });
    }

    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user!.email as string },
    });

    if (!prismaUser) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { name, country } = req.body;
    const location = await prisma.location.create({
      data: {
        name,
        country,
        userId: prismaUser!.id,
      },
    });
    res.status(201).json(location);
  }
}
