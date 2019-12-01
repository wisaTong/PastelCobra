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
  const response = await getToken(code, "529679997616021", "457cec212324e7f754d92beba50a7122");
  console.log(response);


  /**
   * GET user node /me
   * https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#step-6--query-the-user-node
   * 
   * { id username } = res ??
   */


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
  // return axios.post('https://api.instagram.com/oauth/access_token',null,{
  //   params: {
  //     app_id: appId,
  //     app_secret: appSecret,
  //     code: code
  //   }});
  console.log("code: ",code);
  console.log("addid: ", appID);
  return axios({
    method: 'post',
    url: 'https://api.instagram.com/oauth/access_token',
    data: {
      app_id: appId,
      app_secret: appSecret,
      code: code
    }
  });
    
}

export default router;
