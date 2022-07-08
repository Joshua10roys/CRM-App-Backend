import express from 'express';

const router = express.Router();

router.get('/')

router.get('/:id')

router.post('/create')

router.put('/update/:id')

router.delete('/delete/:id')

export const serviceRouter = router;