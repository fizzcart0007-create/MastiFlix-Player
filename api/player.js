export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

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

  <!-- Telegram Mini App -->
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

    .info {
      text-align: center;
      padding: 30px 20px;
      color: #aaa;
    }

    .status {
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 14px;
    }

    video {
      width: 100%;
      max-height: 75vh;
      background: #000;
      display: block;
    }
  </style>
</head>

<body>

  <div class="header">
    🎬 MastiFlix Player
  </div>

  <div id="info" class="info">
    ⏳ Loading video...
  </div>

  <video
    id="videoPlayer"
    controls
    playsinline
    preload="metadata"
    style="display:none;"
  ></video>

  <div class="status">
    📺 Advertisement may appear before video playback
  </div>

<script>

  // Telegram Mini App
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();
  }

  const info = document.getElementById("info");
  const video = document.getElementById("videoPlayer");

  // Telegram startapp parameter
  const token =
    tg?.initDataUnsafe?.start_param || "";

  // AdsGram
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

  async function loadVideo() {

    if (!token) {

      info.innerHTML = `
        <b>🎬 MastiFlix Player</b>
        <br><br>
        Open this app from the Telegram channel's
        <b>▶️ Play Now</b> button to play a video.
      `;

      return;
    }

    try {

      const response = await fetch(
        "/api/video?token=" + encodeURIComponent(token)
      );

      const data = await response.json();

      if (!data.ok) {

        info.innerHTML =
          "❌ Video not available";

        return;
      }

      video.src = data.video_url;

      video.style.display = "block";

      info.style.display = "none";

    } catch (error) {

      console.log(error);

      info.innerHTML =
        "❌ Unable to load video";
    }
  }

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

  loadVideo();

</script>

</body>
</html>
  `);
}
