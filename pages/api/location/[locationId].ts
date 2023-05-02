import { prisma } from '@/server/db/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // DELETE METHOD
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    // Verify session exists
    if (!session) {
      res.status(401).json({
        error: 'You must login to delete this location',
      });
      return;
    }

    // Extract locationId from url params and verify it exists in database
    const { locationId } = req.query;
    const location = await prisma.location.findUnique({
      where: {
        id: Number(locationId),
      },
    });

    if (!location) {
      res.status(404).json({
        error: 'Location not found',
      });
      return;
    }

    // Retrieve user's id to verify against location userId
    const prismaUser = await prisma.user.findUnique({
      where: { id: location.userId },
    });

    if (!prismaUser || location.userId !== prismaUser.id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const deleteLocation = await prisma.location.delete({
      where: {
        id: Number(locationId),
      },
    });

    res.status(200).json({
      deleteLocation,
    });
  }
}
