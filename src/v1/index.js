import Router from 'express-promise-router';
import auth from './routes/auth';
import profile from './routes/profile';
import stats from './routes/stats';

const router = Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/stats', stats);

export default router;
