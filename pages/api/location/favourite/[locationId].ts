import { prisma } from '@/server/db/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({
        error: 'You must login to edit this location',
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user!.email as string,
      },
    });

    const { locationId } = req.query;

    const hasFavourited = await prisma.location.findFirst({
      where: {
        id: Number(locationId),
        favourite: {
          some: {
            userId: user!.id,
          },
        },
      },
      include: {
        favourite: true,
      },
    });

    if (hasFavourited) {
      res.status(200).json({
        message: `User has favourited`,
      });
      return;
    }

    res.status(404).json({
      message: 'User has not favourited',
    });
    return;
  }

  if (req.method === 'POST') {
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

    const user = await prisma.user.findUnique({
      where: {
        email: session.user!.email as string,
      },
    });

    const favourite = await prisma.userFavouriteLocations.create({
      data: {
        userId: user!.id,
        locationId: location!.id,
      },
    });

    res.status(201).json({
      message: `Trying to favourite ${location}`,
    });
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({
        error: 'You must login to edit this location',
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user!.email as string,
      },
    });

    const { locationId } = req.query;

    const hasFavourited = await prisma.userFavouriteLocations.deleteMany({
      where: {
        location: {
          id: Number(locationId),
        },
        user: {
          id: user!.id,
        },
      },
    });

    // if (hasFavourited) {
    //   res.status(200).json({
    //     message: `User has un-favourited`,
    //   });
    //   return;
    // }

    res.status(200).json({
      message: 'User has un-favourited this location',
    });
    return;
  }
}
