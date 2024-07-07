import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
const generateId = (prefix: string) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const idLength = 12;
    let id = prefix + '_';
    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

router
    .route('/')
    .get(async (req: any, res: any) => {
        try {
            const {
                page = '1',
                limit = '5',
                search,
                filter,
            } = req.query;

            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const skip = (pageNumber - 1) * limitNumber;
            let whereClause: any = {};

            if (search) {
                whereClause.OR = [
                    { actor_id: { contains: search as string, mode: 'insensitive' } },
                    { actor_name: { contains: search as string, mode: 'insensitive' } },
                    { object: { contains: search as string, mode: 'insensitive' } },
                    { group: { contains: search as string, mode: 'insensitive' } },
                    { target_id: { contains: search as string, mode: 'insensitive' } },
                    { target_name: { contains: search as string, mode: 'insensitive' } },
                    { location: { contains: search as string, mode: 'insensitive' } },
                    { action: { path: ['name'], string_contains: search as string } },
                    { action: { path: ['object'], string_contains: search as string } },
                    { metadata: { path: ['description'], string_contains: search as string } },
                    { metadata: { path: ['redirect'], string_contains: search as string } }
                ];
            }

            if (filter) {
                const filterObj = JSON.parse(filter as string);
                if (filterObj.actor_id) whereClause.actor_id = { contains: filterObj.actor_id };
                if (filterObj.actor_name) whereClause.actor_name = { contains: filterObj.actor_name };
                if (filterObj.target_id) whereClause.target_id = { contains: filterObj.target_id };
                if (filterObj.target_name) whereClause.target_name = { contains: filterObj.target_name };
                if (filterObj.action_id) whereClause.action = { path: ['id'], string_contains: filterObj.action_id };
                if (filterObj.action_name) whereClause.action = { path: ['name'], string_contains: filterObj.action_name };
            }

            const totalCount = await prisma.event.count({ where: whereClause });
            const events = await prisma.event.findMany({
                where: whereClause,
                skip,
                take: limitNumber,
                orderBy: {
                    occurred_at: 'desc',
                },
            });
            res.status(200).json({ events, totalCount });
        } catch (error) {
            console.log("🚀 ~ .get ~ error:", error)
            res.status(500).json({ error: 'Unable to fetch events' });
        }
    })
    .post(async (req: any, res: any) => {
        try {
            const {
                event_object,
                actor_id,
                actor_name,
                group,
                action_name,
                action_object,
                target_id,
                target_name,
                location,
                redirect,
                description,
            } = req.body;
            const newEvent = await prisma.event.create({
                data: {
                    id: generateId('evt'),
                    object: event_object,
                    actor_id,
                    actor_name,
                    group,
                    action: {
                        id: generateId('evt_action'),
                        name: action_name,
                        object: action_object
                    },
                    target_id,
                    target_name,
                    location,
                    occurred_at: new Date(),
                    metadata: {
                        redirect,
                        description,
                        x_request_id: generateId('req')
                    }
                }
            });
            res.status(201).json(newEvent);
        } catch (error) {
            console.log("🚀 ~ .post ~ error:", error);
            res.status(500).json({ error: 'Unable to create event' });
        }
    })

export default router;