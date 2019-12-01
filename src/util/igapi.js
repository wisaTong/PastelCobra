import axios from 'axios';

/** https://developers.facebook.com/docs/instagram-basic-display-api/getting-started#step-5--exchange-the-code-for-a-token */
export async function getToken(code) {
  const { APP_ID, APP_SECRET, REDIRECT_URI } = process.env;
  return axios({
    method: 'post',
    url: 'https://api.instagram.com/oauth/access_token',
    params: {
      app_id: APP_ID,
      app_secret: APP_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      code: code
    }
  });
}

/** https://developers.facebook.com/docs/instagram-basic-display-api/reference/me */
export async function getUserId(token) {
  return axios({
    method: 'get',
    url: 'https://graph.instagram.com/me',
    params: {
      fields: 'id,username',
      access_token: token
    }
  });
}

/** https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media */
export async function getUserMedia(token, userId) {
  return axios({
    method: 'get',
    url: `https://graph.instagram.com/${userId}/media`,
    params: { access_token: token }
  });
}

/** https://developers.facebook.com/docs/instagram-basic-display-api/reference/media */
export async function getMediaUrl(token, mediaId) {
  return axios({
    method: 'get',
    url: `https://graph.instagram.com/${mediaId}`,
    params: {
      fields: 'id,media_type,media_url,permalink',
      access_token: token
    }
  });
}