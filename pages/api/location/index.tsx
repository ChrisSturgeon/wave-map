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

    const location = await prisma.location.create({
      data: {
        name: req.body.name,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        surfing: Boolean(req.body.surfing),
        windsurfing: Boolean(req.body.windsurfing),
        kitesurfing: Boolean(req.body.kitesurfing),
        paddleboarding: Boolean(req.body.paddleboarding),
        parking: req.body.parking,
        toilets: req.body.toilets,
        wavetype: req.body.wavetype,
        cafe: req.body.cafe,
        userId: prismaUser!.id,
      },
    });
    res.status(201).json(location);
  }
}
