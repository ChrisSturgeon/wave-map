import { prisma } from '@/server/db/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    // Verify user session exists
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({
        error: 'You must login to edit this location',
      });
      return;
    }

    // Verify location still exists in database
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

    // Check user is owner of location
    const prismaUser = await prisma.user.findUnique({
      where: { id: location.userId },
    });

    if (!prismaUser || location.userId !== prismaUser.id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Update location
    const updateLocation = await prisma.location.update({
      where: {
        id: Number(req.query.locationId),
      },
      data: {
        name: req.body.name,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        surfing: Boolean(req.body.surfing),
        windsurfing: Boolean(req.body.windsurfing),
        kitesurfing: Boolean(req.body.kitesurfing),
        wingsurfing: Boolean(req.body.wingsurfing),
        paddleboarding: Boolean(req.body.paddleboarding),
        parking: req.body.parking,
        toilets: req.body.toilets,
        wavetype: req.body.waveType,
        cafe: req.body.cafe,
        userId: prismaUser!.id,
      },
    });
    res.status(200).json(updateLocation);
  }

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
