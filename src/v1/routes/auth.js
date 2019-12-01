import Router from 'express-promise-router';
import axios from 'axios';

const router = Router();

router.get('/', auth);


async function auth(req, res) {
  const { code } = req.query;
  /**
   * Send code by POST request in exhange for token 
   * https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#step-5--exchange-the-code-for-a-token
   */
  // EXAMPLE
  const resToken = await getToken(code, "754866428313827", "13e62e7cdc68d87a03b20936404d4392")

  /**
   * GET user node /me
   * https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#step-6--query-the-user-node
   * 
   * { id username } = res ??
   */
  const resMe = await me('IGQVJWa0w1RjVhcFQ5a2oyeHF1SGhiUHVtX0RvWUNUSUlhcUU2NzJaaUd1aUI1QzBLeWl4ZAGNNLVZABMl9reVd4QXhwRFR5dkdnZAUpQeUtnQ01LTU9xdGQ3cW90UUx0eEdaUDFLd0ljenFsWk41SDVKNUZAVRGZAQNHBoV1BB')
  console.log(resMe.data)

  /**
   * GET user medias
   * https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media
   * 
   */

  /**
   * GET media urls from id
   * https://developers.facebook.com/docs/instagram-basic-display-api/reference/media
   * 
   * DONE!!!
   */
  return res.json(code);
}

async function getToken(code, appId, appSecret) {
  return axios({
    method: 'post',
    url: 'https://api.instagram.com/oauth/access_token',
    params: {
      app_id: appId,
      app_secret: appSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'https://127.0.0.1/v1/auth'
    }
  });
}

async function me(token) {
  return axios({
    method: 'get',
    url: 'https://graph.instagram.com/me',
    params: {
      fields: 'id,username',
      access_token: token
    }
  });
}

export default router;
