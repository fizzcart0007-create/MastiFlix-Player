export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const html = [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    "<title>MastiFlix Player</title>",

    '<script src="https://telegram.org/js/telegram-web-app.js"></script>',

    "<style>",
    "* { box-sizing: border-box; }",

    "body {",
    "  margin: 0;",
    "  background: #000;",
    "  color: #fff;",
    "  font-family: Arial, sans-serif;",
    "  min-height: 100vh;",
    "}",

    ".header {",
    "  padding: 18px;",
    "  text-align: center;",
    "  font-size: 24px;",
    "  font-weight: bold;",
    "}",

    ".info {",
    "  text-align: center;",
    "  padding: 30px 20px;",
    "  color: #aaa;",
    "}",

    ".status {",
    "  text-align: center;",
    "  padding: 15px;",
    "  color: #777;",
    "  font-size: 13px;",
    "}",

    "video {",
    "  width: 100%;",
    "  max-height: 75vh;",
    "  background: #000;",
    "  display: block;",
    "}",

    "</style>",
    "</head>",

    "<body>",

    '<div class="header">🎬 MastiFlix Player</div>',

    '<div id="info" class="info">⏳ Loading video...</div>',

    '<video id="videoPlayer" controls playsinline preload="metadata" style="display:none;"></video>',

    '<div class="status">▶️ Video ready to play</div>',

    "<script>",

    "const tg = window.Telegram && window.Telegram.WebApp;",

    "if (tg) {",
    "  tg.ready();",
    "  tg.expand();",
    "}",

    'const info = document.getElementById("info");',
    'const video = document.getElementById("videoPlayer");',

    "const token = tg && tg.initDataUnsafe",
    "  ? (tg.initDataUnsafe.start_param || '')",
    "  : '';",

    "async function loadVideo() {",

    "  if (!token) {",

    '    info.innerHTML = "<b>🎬 MastiFlix Player</b><br><br>Open this app from the Telegram channel Play Now button to play a video.";',

    "    return;",
    "  }",

    "  try {",

    '    const response = await fetch("/api/video?token=" + encodeURIComponent(token));',

    "    const data = await response.json();",

    "    if (!data.ok) {",

    '      info.innerHTML = "❌ Video not available";',

    "      return;",
    "    }",

    "    video.src = data.video_url;",

    '    video.style.display = "block";',

    '    info.style.display = "none";',

    "  } catch (error) {",

    "    console.log(error);",

    '    info.innerHTML = "❌ Unable to load video";',

    "  }",

    "}",

    "loadVideo();",

    "</script>",

    "</body>",
    "</html>"
  ].join("\n");

  return res.status(200).send(html);
}
