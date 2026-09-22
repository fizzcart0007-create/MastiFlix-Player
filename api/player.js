import { get } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const token =
      req.query.startapp ||
      req.query.tgWebAppStartParam;

    if (!token) {
      return res.status(400).send("Video token missing");
    }

    const result = await get(`play/${token}.json`, {
      access: "private",
      useCache: false
    });

    const text = await new Response(result.stream).text();
    const data = JSON.parse(text);

    const fileId = data.file_id;

    if (!fileId) {
      return res.status(404).send("Video not found");
    }

    const botToken = process.env.BOT_TOKEN;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileId)}`
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      return res.status(500).send("Telegram file not found");
    }

    const filePath = telegramData.result.file_path;

    const videoUrl =
      `https://api.telegram.org/file/bot${botToken}/${filePath}`;

    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    return res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>MastiFlix Player</title>

  <!-- Telegram WebApp -->
  <script src="https://telegram.org/js/telegram-web-app.js"></script>

  <!-- AdsGram -->
  <script src="https://sad.adsgram.ai/js/sad.min.js"></script>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #000;
      color: #fff;
      font-family: Arial, sans-serif;
      min-height: 100vh;
    }

    .header {
      padding: 18px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }

    video {
      width: 100%;
      max-height: 75vh;
      background: #000;
      display: block;
    }

    .message {
      text-align: center;
      padding: 20px;
      color: #aaa;
    }
  </style>

</head>

<body>

  <div class="header">
    🎬 MastiFlix Player
  </div>

  <video
    id="videoPlayer"
    controls
    playsinline
    preload="metadata"
    src="${videoUrl}"
  ></video>

  <div class="message">
    ▶️ Video ready to play
  </div>

  <script>

    // Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    const video =
      document.getElementById("videoPlayer");

    let AdController = null;

    try {
      AdController = window.Adsgram.init({
        blockId: "int-49186"
      });
    } catch (error) {
      console.log("AdsGram init error:", error);
    }

    let adShown = false;
    let showingAd = false;

    video.addEventListener("play", async () => {

      if (adShown || showingAd) {
        return;
      }

      adShown = true;
      showingAd = true;

      video.pause();

      if (AdController) {
        try {
          await AdController.show();
          console.log("AdsGram ad completed");
        } catch (error) {
          console.log("AdsGram error:", error);
        }
      }

      showingAd = false;

      try {
        await video.play();
      } catch (error) {
        console.log("Video play error:", error);
      }

    });

  </script>

</body>
</html>
    `);

  } catch (error) {

    console.error("PLAYER ERROR:", error);

    return res.status(500).send(
      "Player error: " + error.message
    );
  }
}
