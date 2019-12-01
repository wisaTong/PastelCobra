import Router from 'express-promise-router';
import { getMediaUrl, getUserId, getUserMedia } from '../../util/igapi';
import { histrogramPixelRun } from '../../util/histogramPalette';

const router = Router();

router.get('/medias', medias);

async function medias(req, res) {
  const token = req.query.access_token;
  
  const { data: me} = await getUserId(token);
  const { id } = me;

  const { data: userMedia } = await getUserMedia(token, id);
  const medias = userMedia.data.map(d => d.id);

  const mediaUrls = await getMediaUrls(token, medias);
  const mediaBuckets = await Promise.all(mediaUrls.map(url => histrogramPixelRun(url)));
  return res.json(mediaBuckets);
}

async function getMediaUrls(token, mediaIds) {
  const promises = mediaIds.map(id => getMediaUrl(token, id));
  const arr = await Promise.all(promises);
  return arr.map(r => r.data.media_url);
}

export default router;
