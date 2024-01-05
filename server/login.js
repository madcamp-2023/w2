const { accessToken } = req.body;

const { data } = await axios.get(
  `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
);