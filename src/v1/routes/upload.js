import Router from 'express-promise-router';
import { imgDataFromUrl, collectPixels } from '../../util/image';
import { histrogramPixelRun } from '../../util/histogramPalette';

const router = Router();

router.get('/arbitary', collectPxlUpload);

async function collectPxlUpload(req, res) {
  const { imgUrl } = req.query;
  return res.json(await histrogramPixelRun(imgUrl));
}

export default router;
