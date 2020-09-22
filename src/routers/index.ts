import { Router } from 'express';
import Boom from '@hapi/boom';
import getterRouter from './router.getter'

const router = Router();

// test
router.use('/auth', (req, res) => {
    res.json({ type: 0 });
});

router.use('/getter', getterRouter);

router.use((req, res, next) => {
    next(Boom.notFound('API Method not found'));
});

export default router;
