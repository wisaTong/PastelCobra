import Router from 'express-promise-router';
import auth from './routes/auth';
import upload from './routes/upload';
import stats from './routes/stats';
import ig from './routes/ig';

const router = Router();

router.use('/auth', auth);
router.use('/upload', upload);
router.use('/stats', stats);
router.use('/ig', ig);

export default router;
