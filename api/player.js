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
    '<script src="https://sad.adsgram.ai/js/sad.min.js"></script>',

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

    ".buttons {",
    "  text-align: center;",
    "  padding: 15px;",
    "}",

    ".ad-button {",
    "  background: #222;",
    "  color: #fff;",
    "  border: 1px solid #555;",
    "  border-radius: 8px;",
    "  padding: 12px 20px;",
    "  font-size: 15px;",
    "  cursor: pointer;",
    "}",

    ".ad-button:disabled {",
    "  opacity: 0.5;",
    "  cursor: default;",
    "}",

    ".status {",
    "  text-align: center;",
    "  padding: 10px;",
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

    '<div id="buttons" class="buttons" style="display:none;">',
    '<button id="adButton" class="ad-button">📺 Watch Ad</button>',
    "</div>",

    '<div class="status">',
    "Advertisement is optional.",
    "</div>",

    "<script>",

    "const tg = window.Telegram && window.Telegram.WebApp;",

    "if (tg) {",
    "  tg.ready();",
    "  tg.expand();",
    "}",

    'const info = document.getElementById("info");',
    'const video = document.getElementById("videoPlayer");',
    'const buttons = document.getElementById("buttons");',
    'const adButton = document.getElementById("adButton");',

    "const token = tg && tg.initDataUnsafe",
    "  ? (tg.initDataUnsafe.start_param || '')",
    "  : '';",

    "let AdController = null;",

    "try {",

    "  if (window.Adsgram) {",

    "    AdController = window.Adsgram.init({",
    '      blockId: "int-49327"',
    "    });",

    "  }",

    "} catch (error) {",

    '  console.log("AdsGram init error:", error);',

    "}",

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

    '    buttons.style.display = "block";',

    '    info.style.display = "none";',

    "  } catch (error) {",

    "    console.log(error);",

    '    info.innerHTML = "❌ Unable to load video";',

    "  }",

    "}",

    "adButton.addEventListener('click', async function() {",

    "  if (!AdController) {",

    '    adButton.innerText = "Ad unavailable";',

    "    return;",

    "  }",

    "  adButton.disabled = true;",

    '  adButton.innerText = "⏳ Loading Ad...";',

    "  try {",

    "    await AdController.show();",

    '    adButton.innerText = "✅ Ad completed";',

    "  } catch (error) {",

    "    console.log('AdsGram error:', error);",

    '    adButton.innerText = "📺 Watch Ad";',

    "  }",

    "  setTimeout(function() {",

    "    adButton.disabled = false;",

    '    adButton.innerText = "📺 Watch Ad";',

    "  }, 3000);",

    "});",

    "loadVideo();",

    "</script>",

    "</body>",
    "</html>"
  ].join("\n");

  return res.status(200).send(html);
}
