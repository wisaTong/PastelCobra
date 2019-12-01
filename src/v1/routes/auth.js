import Router from 'express-promise-router';
import { getToken } from '../../util/igapi';

const router = Router();

router.get('/', auth);

async function auth(req, res) {
  const { code } = req.query;
  const { data } = await getToken(code);
  return res.json(data);
}

export default router;
