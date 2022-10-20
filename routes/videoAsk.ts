import express from "express";
import axios from "axios";
import qs from "qs";
const router = express.Router();

router.get("/", async (req, res) => {
  const response = await axios({
    method: "get",
    url: "https://api.videoask.com/forms/5625efd6-e7e9-4b5c-ac78-f2a7b429e79c/contacts?limit=200&offset=0",
    headers: {
      Authorization: process.env.AUTHORIZATION,
      "organization-id": process.env.ORGANIZATIONID,
    },
  });
  // const data = { ...response.data };
  try {
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

/.den route måste fixas för att posta en access token som gäller för 24h/;

router.get("/token", async (req, res) => {
  const data = qs.stringify({
    grant_type: "authorization_code",
    code: process.env.AUTHORIZATION,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_url: "http://localhost:5000/videoask",
  });

  const response = await axios({
    method: "post",
    url: "https://auth.videoask.com/oauth/token",
    headers: {},
    data: data,
  });
  try {
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

export default router;
