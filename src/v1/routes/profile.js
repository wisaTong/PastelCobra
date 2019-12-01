import Router from 'express-promise-router';
import { imgDataFromUrl, collectPixels } from '../../util/image';
import { binPixels } from '../../util/histogramPalette';

const router = Router();

router.get('/arbitary', collectPxlUpload);

async function collectPxlUpload(req, res) {
  const { imgUrl } = req.query;
  const imgData = await imgDataFromUrl(imgUrl);
  const pixels = await collectPixels(imgData);
  return res.json(await binPixels(pixels, 3));
}

export default router;
