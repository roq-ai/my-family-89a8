import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { emergencyContactValidationSchema } from 'validationSchema/emergency-contacts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.emergency_contact
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEmergencyContactById();
    case 'PUT':
      return updateEmergencyContactById();
    case 'DELETE':
      return deleteEmergencyContactById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmergencyContactById() {
    const data = await prisma.emergency_contact.findFirst(convertQueryToPrismaUtil(req.query, 'emergency_contact'));
    return res.status(200).json(data);
  }

  async function updateEmergencyContactById() {
    await emergencyContactValidationSchema.validate(req.body);
    const data = await prisma.emergency_contact.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEmergencyContactById() {
    const data = await prisma.emergency_contact.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
