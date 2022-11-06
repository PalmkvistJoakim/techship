import express from "express";
import axios from "axios";
import { Request, Response } from "express";
const router = express.Router();

router.get("/auth", (req, res) => {
  res.redirect(
    `https://auth.videoask.com/authorize?response_type=code&audience=https://api.videoask.it/&client_id=${process.env.CLIENT_ID}&scope=${process.env.SCOPE}&redirect_uri=${process.env.APP_URL}`
  );
});

router.get("/oauth-callback", async (req: Request | any, res: Response) => {
  let parameters = new URLSearchParams(req.query);
  const Code = parameters.get("code");
  const body = {
    grant_type: process.env.GRANT_TYPE,
    code: Code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.APP_URL,
  };
  const opts = { headers: { accept: "application/json" } };
  await axios
    .post("https://auth.videoask.com/oauth/token", body, opts)
    .then((res) => res.data.access_token)
    .then((token) => {
      res.redirect(`http://localhost:3000/?home=${token}`);
    });
});

router.post("/form", async (req, res) => {
  const data = JSON.stringify({
    title: `${req.body.title}`,
    show_contact_name: true,
    show_contact_email: true,
    show_contact_phone_number: true,
    show_consent: false,
    requires_contact_name: false,
    requires_contact_email: false,
    requires_contact_phone_number: false,
    requires_consent: false,
  });

  var config = {
    method: "post",
    url: "https://api.videoask.com/forms",
    headers: {
      Authorization: `${req.body.token}`,
      "Content-Type": "application/json",
      "organization-id": process.env.ORGANIZATIONID,
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/form", async (req, res) => {
  const tokenId = req.query.token;
  const config = {
    method: "GET",
    url: "https://api.videoask.com/forms",
    headers: {
      Authorization: `${tokenId}`,
      "organization-id": process.env.ORGANIZATIONID,
    },
  };
  axios(config)
    .then(function (response) {
      res.send(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
});

export default router;
