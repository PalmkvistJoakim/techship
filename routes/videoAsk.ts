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

export default router;
