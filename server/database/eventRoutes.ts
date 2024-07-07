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