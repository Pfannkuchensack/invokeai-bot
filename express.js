import { invokeImage } from "./bot.js";
import express from "express";
import asyncHandler from "express-async-handler";
const app = express();
const port = 3000;

app.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let config = {
      steps: 25,
      iterations: 1,
      cfg: 7,
      model: "stable-diffusion-v1-5", // Liste der Models http://127.0.0.1:9090/api/v2/models/ // wird gerade nicht benutzt
      //seed: Math.floor(Math.random() * 1000000),
      rseed: false,
      width: 512,
      height: 512,
      clip: 0,
      scheduler: "euler",
    };
    let prompt = {
      positive: req.query.positive || "A beautiful sunset over the city",
      negative: "<FastNegativeEmbedding>",
    };
    // invokeImage out of bot.js

    let imageurl = await invokeImage(config, prompt);
	console.log(imageurl);
    res.send(imageurl);
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
