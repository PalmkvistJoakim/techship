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
      res.redirect(`http://localhost:3000/dashboard?home=${token}`);
    });
});

router.get("/form", async (req, res) => {
  const tokenId = req.query.token;
  const config = {
    method: "GET",
    url: "https://api.videoask.com/forms",
    headers: {
      Authorization: `Bearer ${tokenId}`,
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
router.get("/form/:id", async (req, res) => {
  const tokenId = req.query.token;
  const form = req.params.id;
  const config = {
    method: "GET",
    url: `https://api.videoask.com/forms/${form}/contacts?limit=200&offset=0`,
    headers: {
      Authorization: `Bearer ${tokenId}`,
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

router.get("/users/:id", async (req, res) => {
  const tokenId = req.query.token;
  const form = req.query.form;
  const id = req.params.id;
  const config = {
    method: "GET",
    url: `https://api.videoask.com/forms/${form}/contacts/${id}?include_answers=true&all_answers_transcoded=true`,
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  };
  axios(config)
    .then(function (response) {
      res.send(response.data.answers);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/profile/:id", (req, res) => {
  const tokenId = req.query.token;
  const respondentId = req.params.id;
  const config = {
    method: "delete",
    url: `https://api.videoask.com/respondents/${respondentId}`,
    headers: {
      Authorization: `Bearer ${tokenId}`,
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
